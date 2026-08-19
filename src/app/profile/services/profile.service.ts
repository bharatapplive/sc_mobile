import { Injectable , Input } from '@angular/core';
import { Profile } from '../models/profile.model';
import { Highlight } from '../models/highlight.model';
import { ProfilePost } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: Profile = {
    username: 'ankush.ooo7',
    fullName: 'Ankush Jha',
    avatarUrl: 'assets/ai_img.png',
    avatarAlt: 'Profile picture of Ankush Jha',
    bio: [
      'Digital Artist & Interface Designer 🎨',
      'Creating vibrant experiences for the modern web.',
      '📍 NYC | Based in the Cloud'
    ],
    postCount: 42,
    followerCount: '12.5k',
    followingCount: 840
  };

  private highlights: Highlight[] = [
    {
      id: 1,
      label: 'WIPs',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_QcC1kFKnZv1PnesGEI05P81zjCxZhyc2MRiWrbh-qLiZW1SSdvH7-MqHJ7bcJnIkp9YpQvQSik1XHzFpI7zRXO5CKHINYPtV5mV-lA-m5QvrmBDSrUJ2ALG_m44sLIpo2gpG6NspBA7U4AslV0aEd5OHQi-yiIUfBsukOKvOrxgwU9li0EWjpI3wdFBq8WmnrLHd4slgFUYyoS1UKacFOllR7r6554di_24ygLCwXXJ1rZuG64WU5h57JEQTTvXmCWANdGOE3uY',
      imageAlt: 'Vibrant flowers in a minimalist ceramic vase'
    },
    {
      id: 2,
      label: 'Studio',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHMIqqYYX08hoONpEARWVjJzuDTAmwkIxmYA_EAN7WT1qQkFSAWLrDiPbraOTTjwBnLm1Ka_Z-LZPpUPmr9leve--ePCR4MJVfLdF9G1kiSK-Dt469EGbG2ZQPfELJrtR6f7YPtZNGxR9fNjmCuz0CwI1uyCMXFVVkhvopqxqNoPLsw7heKmT8V24syk21aN7sU9ODmFOijHzU5Jsh0HyFwHq5-Ae6uhnPTQjSAJGxqmizlMhhbSNosoC8z9A9lJSNVs0ETd0PkZI',
      imageAlt: 'Creative workspace with laptop and tablet'
    },
    {
      id: 3,
      label: 'Travel',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW7MPN80HKqnmc8_03-sEZhJ22cRGrjpUgm1qRCC7BzwiKQWCYY6tDduSXiJJqpXgRDBNHr2uGm_Py_qfnvMJbsN61RO4t2CojmOBcpV3Mw5C9Dbk1h4Rzfz6Ngsyr6LrNI7A1onClqSpJPJ2iDpfap01QhO4ZJl-XqNtek_w07YMdo7KIB7n4XJxvQtJyisDm-b3o_TVZosTgn_ZTL37793alALECZ5p7Vv_WO5pBGN2u9SJPo6ofRC-tu75ee74LjhbprGRdRZE',
      imageAlt: 'City skyline at dusk with neon lights'
    },
    {
      id: 4,
      label: 'Tech',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUdXj0-bWi1xej4Q7VBTuOmNfNME4SfzzT-GYZaHzWDGrjpUgm1qRCC7BzwiKQWCYY6tDduSXiJJqpXgRDBNHr2uGm_Py_qfnvMJbsN61RO4t2CojmOBcpV3Mw5C9Dbk1h4Rzfz6Ngsyr6LrNI7A1onClqSpJPJ2iDpfap01QhO4ZJl-XqNtek_w07YMdo7KIB7n4XJxvQtJyisDm-b3o_TVZosTgn_ZTL37793alALECZ5p7Vv_WO5pBGN2u9SJPo6ofRC-tu75ee74LjhbprGRdRZE',
      imageAlt: 'Prismatic light reflections on glass surface'
    }
  ];

  private posts: ProfilePost[] = [
    {
      id: 1,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYSF7ciSVMRCPr203YL3e2gX1D9TbhMaoH2hQYu_fvv6OW3u1LuMGJrN6DTKydqcAgVJhdEfktp8joevIz3VIKQzo0hdIOFbv6MzJL9nICZ1EZYRWkWp9r0cdgUo7hZDXOE6ykI9xU0UjK-atgFTFUpqtJ0AW3I3zl3KCR4hR_3PD-HbtjBwKsLWsl5wdwe9dkLgkHOls5qIuabG0l32irdtWGGoECNa14Lyx0VDjOVEh-dx275YJzG8RNnpMsgG4qg1BrJPIycwk',
      imageAlt: 'Minimalist 3D glass sphere in lavender void',
      likeCount: '1.2k'
    },
    {
      id: 2,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFQBsQf4cAwRwgYDgsSOKHFBQtQbG2DJOzV_yVHHZadXcSqxp1gJbNw8Bywu9uzNmeI9JYmpXFUz1CKNiOLqydt0MBUYkYXbpee5Pu8y9N7iqcxH5xoJTLLDi6dpOT-kd57ZoVVgSc4igdb9qQVKk39MT-7AUqhszTZRefvr-yFS1rc9I0ABd_PkNN7tvyQ43b8jAhggqoPVI00Cv1XoZtJNmBvWUtVRFWQXaCyRMAhHf0M-sAh-7zTNOM8FM',
      imageAlt: 'Design magazines and phone on marble surface',
      likeCount: '854'
    },
    {
      id: 3,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBponTriIXq9-o5gyOpcu-LmkltLM2EjT6VlT7Cp9Sa9vqj3S3kR86_TGR1xsyPnb9e3b-YUonNRba_WHKFcCdTqm87ZJKWJvvDc82hixdTuCPXTG1Hqxz-ACXsnBTz07V_zCO4iJ9KKfkdrryat88HtovIRYrALwaP2gIB2rYL9wG2tZDWDZJRcywYXziyvvRlH6tO9SUl0BqQxC4AebRubDF2i19oVJuqnsrqIhz9H75Q19nBGUo-u9BqU6AkAL2p46QcNBoFkjk',
      imageAlt: 'Abstract electric purple and magenta gradient',
      likeCount: '2.3k'
    },
    {
      id: 4,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdC4qbX34HPukOV-T5zRgm9USiE4BouYyup3QL0WS1591pfk5EVk45jYB2HNhVL9jlHhT94CxEQdDFcet50-WFFQ8Gr-fU6kKz0FAOHrDdRV9I7ch4CzPj5Eg2grVNH9XTaYRs2fTdvkL9MZjcS9fk6M2cBSIn4LMbgyaFVheEa_WXuc7tXleB6eLp4YWDNJtXmVeiMv7j7vXr9XvY2l1ycEobQ8ShX8ukczZ50cv-9aPOxK9_RF53vxd1HFXYLLvC-0j3o08FIfU',
      imageAlt: 'Person in front of neon lights at night',
      likeCount: '1.5k'
    },
    {
      id: 5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6E3bkA_J2XtMcPunO8pZ9KiOcddhMuTcb-EXhS-xPDnuo_qy9jF2-6q48RfV2eqEboDYq0hsUIWSVnA8HuweL6Refqm0HATkNfxfWYid7-K2Z49N8UAMmtrpxQ0L1ewzKAQbXtlr1buvBW-FQL-5ScfqVoKJK7xOtpVACgGzTtKJipJkbskVLB5s74dXVxp2uNQNKeEP2osdX19hMMv2qnkMnNdmtKEvaeFKAxK0GRhmP02NH5Txk2wxQNcaZvoPSDdKXdReEb-E',
      imageAlt: 'Macro shot of mechanical keyboard with purple backlight',
      likeCount: '672'
    },
    {
      id: 6,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCttN0ejraGDkQvPRsvVrCrld9tBzE3z_Y7wMZxdjfT6ZQV3BhUZYmJEqH4qti-knPGnYKlknJ7zTe-BN5RHtXjfpUThGZ1v2bXZ8UPxHmPfc6S0exO9TtY0ZkY-eyTlPUmith-I_wC8Lb8FVK0IsEbIHK1viQXoYoXuWvPcZwhkBT8z9ZbmS5acMxkgPIl0AQnRnEv4ooDgbs8yfof7AKhLMShNnSOq8AqT2alTlWRy8KnV-LpFDp8DeMPkf_VAmu3UYbVIVZVk6E',
      imageAlt: 'Minimalist white building against clear blue sky',
      likeCount: '930'
    }
  ];

  getProfile(): Profile {
    return this.profile;
  }

  getHighlights(): Highlight[] {
    return this.highlights;
  }

  getPosts(): ProfilePost[] {
    return this.posts;
  }
}
