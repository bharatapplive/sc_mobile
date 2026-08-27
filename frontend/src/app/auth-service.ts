import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';

import {
  Injectable,
  signal
} from '@angular/core';

import { Router } from '@angular/router';

import {
  catchError,
  map,
  Observable,
  tap,
  throwError
} from 'rxjs';

import { environment } from 'src/environments/environment';


// =====================================================
// USER INTERFACE
// =====================================================

export interface User {

  _id?: string;

  email: string;

  phoneNumber: string;

  username: string;

  fullname: string;

  password?: string;

  avatarUrl?: string;

  postNumber?: number;

  followerNumber?: number;

  followingNumber?: number;

  profileBio?: string | null;

  isVerified?: boolean;
}


// =====================================================
// REGISTER RESPONSE
// =====================================================

export interface RegisterResponse {

  _id: string;

  email: string;

  phoneNumber: string;

  message: string;
}


// =====================================================
// OTP RESPONSE
// =====================================================

export interface VerifyOtpResponse {

  message: string;

  isVerified: boolean;
}


// =====================================================
// CREATE POST
// =====================================================

export interface CreatePostPayload {

  userId: string;

  author: string;

  caption?: string;

  mediaUrl: string;

  mediaType: 'image' | 'video';

  hashtags?: string[];

  likesCount?: number;

  commentsCount?: number;
}


// =====================================================
// POST RESPONSE
// =====================================================

export interface PostResponse
  extends CreatePostPayload {

  _id: string;

  likes: string[];

  likesCount: number;

  commentsCount: number;

  createdDate: string;

  updatedAt: string;
}


// =====================================================
// UPDATE PROFILE PAYLOAD
// =====================================================

export interface UpdateProfilePayload {

  userId: string;

  fullname: string;

  username: string;

  profileBio?: string | null;
}


// =====================================================
// AUTH SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // ===================================================
  // GLOBAL AUTH STATE
  // ===================================================

  isAuthenticated =
    signal<boolean>(false);

  currentUser =
    signal<User | null>(null);


  // ===================================================
  // CONSTRUCTOR
  // ===================================================

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {

    this.restoreUserSession();

  }


  // ===================================================
  // REGISTER
  // ===================================================

  register(
    userData: User
  ): Observable<RegisterResponse> {

    return this.http
      .post<RegisterResponse>(
        `${environment.apiUrl}/user/register`,
        userData
      )
      .pipe(

        tap(
          (response) => {

            console.log(
              'Registration successful:',
              response
            );

            if (response?._id) {

              localStorage.setItem(
                'uploadPro',
                response._id
              );

            }

            this.isAuthenticated.set(
              false
            );

            this.currentUser.set(
              null
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Registration error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Registration failed. Please try again.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // LOGIN
  // ===================================================

  login(
    identity: string,
    password: string
  ): Observable<User> {

    return this.http
      .post<User>(
        `${environment.apiUrl}/user/login`,
        {
          identity:
            String(identity || '').trim(),

          password:
            String(password || '')
        }
      )
      .pipe(

        tap(
          (user) => {

            console.log(
              'Login successful:',
              user
            );

            this.updateLocalUser(
              user
            );

            localStorage.removeItem(
              'uploadPro'
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Login error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Invalid email, username, phone number or password.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // LOGOUT
  // ===================================================

  logout(): void {

    this.currentUser.set(
      null
    );

    this.isAuthenticated.set(
      false
    );

    localStorage.removeItem(
      'userID'
    );

    localStorage.removeItem(
      'currentUser'
    );

    localStorage.removeItem(
      'user'
    );

    localStorage.removeItem(
      'uploadPro'
    );

    this.router.navigate([
      '/login'
    ]);

  }


  // ===================================================
  // VERIFY OTP
  // ===================================================

  verifyOtp(
    payload: {
      userId: string;
      otp: string;
    }
  ): Observable<VerifyOtpResponse> {

    return this.http
      .post<VerifyOtpResponse>(
        `${environment.apiUrl}/user/verify-otp`,
        {
          userId:
            payload.userId,

          otp:
            String(
              payload.otp || ''
            ).trim()
        }
      )
      .pipe(

        tap(
          (response) => {

            console.log(
              'OTP verification:',
              response
            );

            if (
              response?.isVerified
            ) {

              localStorage.removeItem(
                'uploadPro'
              );

            }

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'OTP verification error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Invalid or expired OTP.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // GET USER PROFILE
  // ===================================================

  loadUserData(): Observable<User> {

    const userId =
      localStorage.getItem('userID') ||
      this.currentUser()?._id ||
      '';

    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User is not logged in.'
          )
      );

    }


    return this.http
      .get<User>(
        `${environment.apiUrl}/user/${userId}`
      )
      .pipe(

        map(
          (user: User) => {

            /*
             * IMPORTANT
             * Backend se avatarUrl ko normalize
             * karke current user me save karenge.
             */

            const normalizedUser =
              this.normalizeUser(
                user
              );

            return normalizedUser;

          }
        ),

        tap(
          (user) => {

            console.log(
              'Latest user data:',
              user
            );

            this.updateLocalUser(
              user
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Load user error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Unable to load user profile.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // UPDATE COMPLETE PROFILE
  // ===================================================

  updateProfile(
    data: UpdateProfilePayload
  ): Observable<User> {

    const userId =
      String(
        data?.userId ||
        localStorage.getItem('userID') ||
        this.currentUser()?._id ||
        ''
      ).trim();


    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User ID is required. Please login again.'
          )
      );

    }


    const fullname =
      String(
        data?.fullname ?? ''
      ).trim();


    const username =
      String(
        data?.username ?? ''
      )
        .trim()
        .toLowerCase();


    const profileBio =
      data?.profileBio == null
        ? null
        : String(
            data.profileBio
          ).trim();


    if (!fullname) {

      return throwError(
        () =>
          new Error(
            'Full name is required.'
          )
      );

    }


    if (!username) {

      return throwError(
        () =>
          new Error(
            'Username is required.'
          )
      );

    }


    if (
      profileBio &&
      profileBio.length > 150
    ) {

      return throwError(
        () =>
          new Error(
            'Bio cannot be longer than 150 characters.'
          )
      );

    }


    const payload:
      UpdateProfilePayload = {

      userId,

      fullname,

      username,

      profileBio

    };


    console.log(
      '📤 Sending profile update:',
      payload
    );


    return this.http
      .patch<any>(
        `${environment.apiUrl}/user/profile`,
        payload
      )
      .pipe(

        tap(
          (response) => {

            console.log(
              '📥 Profile update response:',
              response
            );

          }
        ),

        map(
          (response: any) => {

            const returnedUser =
              response?.user &&
              typeof response.user === 'object'
                ? response.user
                : response;


            if (
              !returnedUser ||
              typeof returnedUser !== 'object'
            ) {

              throw new Error(
                'Invalid profile update response from server.'
              );

            }


            /*
             * Existing avatar ko preserve karna.
             *
             * Kabhi-kabhi profile update API
             * avatarUrl return nahi karti.
             */

            const oldUser =
              this.currentUser();


            const updatedUser: User = {

              ...(oldUser || {}),

              ...returnedUser,

              avatarUrl:
                returnedUser.avatarUrl ??
                oldUser?.avatarUrl ??
                ''

            };


            const normalizedUser =
              this.normalizeUser(
                updatedUser
              );


            this.updateLocalUser(
              normalizedUser
            );


            return normalizedUser;

          }
        ),

        catchError(
          (
            error: HttpErrorResponse | Error
          ) => {

            console.error(
              '❌ Update profile error:',
              error
            );


            const httpError =
              error as HttpErrorResponse;


            const rawMessage =
              httpError?.error?.message ||
              error?.message ||
              'Unable to update profile.';


            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);


            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // UPDATE PROFILE BIO ONLY
  // ===================================================

  updateBio(
    profileBio: string
  ): Observable<User> {

    const userId =
      localStorage.getItem(
        'userID'
      ) ||
      this.currentUser()?._id ||
      '';


    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User is not logged in.'
          )
      );

    }


    return this.http
      .patch<User>(
        `${environment.apiUrl}/user/bio`,
        {
          userId,

          profileBio
        }
      )
      .pipe(

        map(
          (user) =>
            this.normalizeUser(
              user
            )
        ),

        tap(
          (user) => {

            this.updateLocalUser(
              user
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Update bio error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Unable to update profile bio.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // UPDATE POSTS COUNT
  // ===================================================

  updatePost(
    postNumber: number
  ): Observable<User> {

    const userId =
      localStorage.getItem(
        'userID'
      ) ||
      this.currentUser()?._id ||
      '';


    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User is not logged in.'
          )
      );

    }


    return this.http
      .patch<User>(
        `${environment.apiUrl}/user/post`,
        {
          userId,

          postNumber
        }
      )
      .pipe(

        map(
          (user) =>
            this.normalizeUser(
              user
            )
        ),

        tap(
          (user) => {

            this.updateLocalUser(
              user
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Update post count error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Unable to update post count.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // UPDATE FOLLOWERS
  // ===================================================

  updateFollower(
    followerNumber: number
  ): Observable<User> {

    const userId =
      localStorage.getItem(
        'userID'
      ) ||
      this.currentUser()?._id ||
      '';


    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User is not logged in.'
          )
      );

    }


    return this.http
      .patch<User>(
        `${environment.apiUrl}/user/follower`,
        {
          userId,

          followerNumber
        }
      )
      .pipe(

        map(
          (user) =>
            this.normalizeUser(
              user
            )
        ),

        tap(
          (user) => {

            this.updateLocalUser(
              user
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Update followers error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Unable to update followers.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // UPDATE FOLLOWING
  // ===================================================

  updateFollowing(
    followingNumber: number
  ): Observable<User> {

    const userId =
      localStorage.getItem(
        'userID'
      ) ||
      this.currentUser()?._id ||
      '';


    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User is not logged in.'
          )
      );

    }


    return this.http
      .patch<User>(
        `${environment.apiUrl}/user/following`,
        {
          userId,

          followingNumber
        }
      )
      .pipe(

        map(
          (user) =>
            this.normalizeUser(
              user
            )
        ),

        tap(
          (user) => {

            this.updateLocalUser(
              user
            );

          }
        ),

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Update following error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Unable to update following.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // UPLOAD AVATAR
  // ===================================================

  uploadAvatar(
    file: File
  ): Observable<User> {

    const userId =
      localStorage.getItem(
        'userID'
      ) ||
      this.currentUser()?._id ||
      '';


    if (!userId) {

      return throwError(
        () =>
          new Error(
            'User is not logged in.'
          )
      );

    }


    const formData =
      new FormData();


    formData.append(
      'avatar',
      file
    );


    return this.http
      .post<any>(
        `${environment.apiUrl}/user/${userId}/avatar`,
        formData
      )
      .pipe(

        map(
          (response: any) => {

            console.log(
              '📸 Avatar upload response:',
              response
            );


            /*
             * Backend response:
             *
             * {
             *   user: {...}
             * }
             *
             * OR
             *
             * {
             *   ...user
             * }
             */

            const responseUser =
              response?.user &&
              typeof response.user === 'object'
                ? response.user
                : response;


            const oldUser =
              this.currentUser();


            if (
              !responseUser ||
              typeof responseUser !== 'object'
            ) {

              throw new Error(
                'Invalid avatar upload response.'
              );

            }


            /*
             * Old user + new user merge.
             */

            const updatedUser: User = {

              ...(oldUser || {}),

              ...responseUser

            };


            /*
             * Avatar URL normalize.
             */

            const normalizedUser =
              this.normalizeUser(
                updatedUser
              );


            /*
             * Global state update.
             */

            this.updateLocalUser(
              normalizedUser
            );


            console.log(
              '✅ Updated avatar URL:',
              normalizedUser.avatarUrl
            );


            return normalizedUser;

          }
        ),

        catchError(
          (
            error: HttpErrorResponse | Error
          ) => {

            console.error(
              '❌ Avatar upload error:',
              error
            );


            const httpError =
              error as HttpErrorResponse;


            const rawMessage =
              httpError?.error?.message ||
              error?.message ||
              'Unable to upload profile picture.';


            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);


            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // CREATE POST
  // ===================================================

  createNewPost(
    postData: CreatePostPayload
  ): Observable<PostResponse> {

    return this.http
      .post<PostResponse>(
        `${environment.apiUrl}/post`,
        postData
      )
      .pipe(

        catchError(
          (
            error: HttpErrorResponse
          ) => {

            console.error(
              'Create post error:',
              error
            );

            const rawMessage =
              error?.error?.message ||
              'Unable to create post.';

            const message =
              Array.isArray(rawMessage)
                ? rawMessage.join(', ')
                : String(rawMessage);

            return throwError(
              () =>
                new Error(message)
            );

          }
        )

      );

  }


  // ===================================================
  // NORMALIZE AVATAR URL
  // ===================================================

  private normalizeAvatarUrl(
    avatarUrl?: string | null
  ): string {

    if (!avatarUrl) {

      return '';

    }


    let url =
      String(
        avatarUrl
      ).trim();


    if (!url) {

      return '';

    }


    // -----------------------------------------------
    // Already full URL
    // -----------------------------------------------

    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('blob:') ||
      url.startsWith('data:')
    ) {

      return url;

    }


    // -----------------------------------------------
    // Remove unnecessary spaces
    // -----------------------------------------------

    url =
      url.replace(
        /^["']|["']$/g,
        ''
      );


    // -----------------------------------------------
    // Relative backend path
    //
    // /uploads/avatar.jpg
    // uploads/avatar.jpg
    // /avatar/avatar.jpg
    // -----------------------------------------------

    if (
      url.startsWith('/')
    ) {

      return `${environment.apiUrl}${url}`;

    }


    return `${environment.apiUrl}/${url}`;

  }


  // ===================================================
  // NORMALIZE USER
  // ===================================================

  private normalizeUser(
    user: User
  ): User {

    if (
      !user ||
      typeof user !== 'object'
    ) {

      return user;

    }


    return {

      ...user,

      avatarUrl:
        this.normalizeAvatarUrl(
          user.avatarUrl
        )

    };

  }


  // ===================================================
  // PUBLIC AVATAR URL
  // ===================================================

  getUserAvatarUrl(
    cacheBust: boolean = false
  ): string {

    const user =
      this.currentUser();


    const avatar =
      this.normalizeAvatarUrl(
        user?.avatarUrl
      );


    if (!avatar) {

      return 'assets/images/default-avatar.png';

    }


    if (!cacheBust) {

      return avatar;

    }


    const separator =
      avatar.includes('?')
        ? '&'
        : '?';


    return `${avatar}${separator}v=${Date.now()}`;

  }


  // ===================================================
  // UPDATE LOCAL USER
  // ===================================================

  private updateLocalUser(
    user: User
  ): void {

    if (
      !user ||
      typeof user !== 'object'
    ) {

      return;

    }


    /*
     * Normalize avatar before saving.
     */

    const normalizedUser =
      this.normalizeUser(
        user
      );


    /*
     * IMPORTANT:
     * Existing avatar ko preserve karo agar
     * backend response me avatarUrl missing hai.
     */

    const previousUser =
      this.currentUser();


    const finalUser: User = {

      ...(previousUser || {}),

      ...normalizedUser,

      avatarUrl:
        normalizedUser.avatarUrl ||
        previousUser?.avatarUrl ||
        ''

    };


    const userId =
      String(
        finalUser._id || ''
      ).trim();


    // -----------------------------------------------
    // Signal
    // -----------------------------------------------

    this.currentUser.set(
      finalUser
    );


    this.isAuthenticated.set(
      true
    );


    // -----------------------------------------------
    // LocalStorage
    // -----------------------------------------------

    localStorage.setItem(
      'currentUser',
      JSON.stringify(
        finalUser
      )
    );


    /*
     * Older parts of app ke liye
     * user key bhi maintain.
     */

    localStorage.setItem(
      'user',
      JSON.stringify(
        finalUser
      )
    );


    if (userId) {

      localStorage.setItem(
        'userID',
        userId
      );

    }


    console.log(
      '💾 Local user updated:',
      finalUser
    );

    console.log(
      '🖼️ Saved avatar:',
      finalUser.avatarUrl
    );

  }


  // ===================================================
  // RESTORE SESSION
  // ===================================================

  private restoreUserSession(): void {

    const userId =
      localStorage.getItem(
        'userID'
      );


    const savedUser =
      localStorage.getItem(
        'currentUser'
      );


    if (!userId) {

      this.isAuthenticated.set(
        false
      );

      this.currentUser.set(
        null
      );

      return;

    }


    // -----------------------------------------------
    // Restore cached user immediately
    // -----------------------------------------------

    if (savedUser) {

      try {

        const user:
          User =
          JSON.parse(
            savedUser
          );


        const normalizedUser =
          this.normalizeUser(
            user
          );


        this.currentUser.set(
          normalizedUser
        );


        this.isAuthenticated.set(
          true
        );


      } catch (error) {

        console.error(
          'Invalid saved user data.',
          error
        );


        localStorage.removeItem(
          'currentUser'
        );

      }

    }


    // -----------------------------------------------
    // Get latest user from backend
    // -----------------------------------------------

    this.loadUserData()
      .subscribe({

        next: (
          user
        ) => {

          this.currentUser.set(
            user
          );

          this.isAuthenticated.set(
            true
          );

        },


        error: (
          error
        ) => {

          console.error(
            'Session restore failed:',
            error
          );


          /*
           * Cached user ko immediately delete
           * nahi kar rahe.
           *
           * Sirf authentication state false.
           */

          this.isAuthenticated.set(
            false
          );

        }

      });

  }

}