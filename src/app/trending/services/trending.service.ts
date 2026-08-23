import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { TrendPost } from '../models/trend.model';

@Injectable({ providedIn: 'root' })
export class TrendingService {

  private readonly _categories: Category[] = [
    { id: 'trending', label: '#Trending', active: true },
    { id: 'fashion', label: '#Fashion', active: false },
    { id: 'gaming', label: '#Gaming', active: false },
    { id: 'vibecheck', label: '#VibeCheck', active: false },
    { id: 'techlife', label: '#TechLife', active: false },
    { id: 'photography', label: '#Photography', active: false },
  ];

  private readonly _posts: TrendPost[] = [
    {
      id: '1',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHHFkEQuVNlQ_VYaxzwCQQuVi7kaVT2msM9Li4Hr_kjhxQ_ImdrkmJSk02JL3645tEdM-gXyDtKZiSlfci3hMwmaZFz9gK6MuK3z--1YkhoAvv6uRxADIvKXyfoPyjj5OixGbDp9iCvdL00PPFJQOkQ2tYUCtioFNXP6MR3KY5YCdCfEwleuYGgTgH0zRtKGBhANYdGG-l6hl8--2-e6eT7i5SmHd6MX2bJmViyKT8j1RjJPfbeza_E7KkFIMiM_Jv-9xCp8vNeg0',
      imageAlt: 'Young creator in electric purple streetwear jumping in front of a colorful graffiti wall',
      username: 'alex_vibes',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoogjfoyjwlfp0PTUaTGzO9S82fMTknjkFgFu3hSUU4Y8t-Z6ndiYyg9N0NawD4V-Fc1BwGQDHGL8ddqK0qA9g2_Ji_b4sQSGRqv38aGL6CDpDhMvjQkk_3WKC-9KXBvO0rIvGLWscPczwFtK92a5_1GHDhM9C1W6xuHLuCAu6-W34L4iAE--3KzeA8ZRi3-qDslTNB1JOnTaUj2JSQHkHmLDQzS7zZMlyLmXhct6JHzrGqmUnizx_ROI1Yqyo-J8sw_TJDPP_yv8',
      isLiked: true,
    },
    {
      id: '2',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCBLQH3bixXrdKXyFDqHnbf0PnWdwJaSRvAaC2y0KaT8tfVxiS21m7MfKFn66lGT2AJTaPwNcJeTzu0CwMhBIyks_ElUb5LeZ2Bke4hwJXCdR8rohYrkGG88RDiytBtSJvOtYZtCIyY5PRJzqVpgFgxOXvdXH-m_SVCRvJ5iN-QSairZed6oHTXQ1JbcDNwV2orOHv6H33oiZR83sNIUB9CuqMEsTSt9vbAw-KQn43L-7Z07p7s7CrsGf9kkM_Y26uyd1Hj3dyeqk',
      imageAlt: 'Stylized overhead shot of a high-tech minimalist workspace with purple LED lighting',
      username: 'tech_minimalist',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq_35yVxsU60yVA_lV64v4MZFfi1toL5QmpovPmZLiO6SOtQKotIE16uDb36Cqrroq2e4C234QsWVYuhjyuCIiiP3YApWMeKK5bOxxPSfcNw-RPSfdxzIoX7bw1yq3u0IIArHNfDf-IEILkG_u8nLLm9Gmv2hflFdhV-GkIWzgGNNdBeqJKq0w3MBw_5oje_XWLawcN8BXlmrf5TBSeiLJujn5-Zpw24Rf3h_ncXGGAd9NoGjLLhcB1U3reOyeXtP-iZttEIFomps',
    },
    {
      id: '3',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCMG7OTF-hz0ZCHSnk1I15XEprQ6fmoduxCWZb_RQVl-oYhXGyg9_xez0FVGlUFkyAV_98UEcXwlT-Zy3n-P3RLWVkWfCyDVOFXEZT5IQTjSIJxwao5NMW-jNPqs5IjnuX1zDlHel7N-TBrdOnErk2AEoOEt_kxbJCnJ4mYyYKWkoZBTZuhEeDENF8IffaR1a2NhJYNXP4yfXObxq124cTBv0Z5Lrmeo8FNPCVRDn_T4zWWTW_vUpoJ_cuV8mu2TZm7j_XtURIFiY',
      imageAlt: 'Two friends laughing together in a sun-drenched urban setting wearing pastel outfits',
      caption: 'Weekend vibes only ✨',
    },
    {
      id: '4',
      cardType: 'featured',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_rSZQrVnuJYD-Rid-uIV6SKeMNcFuEwIYnzVZdLjzHZrNhbhzXqdrkOmJ4FybBHM3fjbo_Fdn7jitvtZyBxT5hlA8uvi8xkNK_zOmSOj_63Oee12z4H5eAEZzTR14ntO2wsMIzTLZrLRp8gbhyIePGAjNIF9FpmigO12Z-nImHEiQMZXL6GVqEApjT_sWq0M0xxmbm-dJUAizLVXnKIq58E02GDxpHR6qOMQG8JhaULy4oWK6iDturnvtJgHpZG4KxF-dR9ARlJo',
      imageAlt: 'Abstract digital artwork with swirling 3D ribbons of iridescent purple and magenta glass',
      isFeatured: true,
    },
    {
      id: '5',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCO7fOWxcQ0IMXnXlx8VGyC5jjips16FvRLYCUOvckRgxIgJt1tcpPXxdKikF_t4k-xqU2Rw6I9pmIbpcelrA1eZL-CAt72k7w1_PtawFxloLs-wsmcBG23PXBjtGiCz5IDugdYrU7o-uzhzlWgBti4w7JN0iqB6fkBCZYDCoREpt2uXgGWy-p_xQ9rWrch_LxrhBEEX815kbdfFIYCSRoaDm6FCaSKKGqsQoKJVlf24JvRAM5EypBm-8fex8AaMeqQvjkGhVMpFhg',
      imageAlt: 'High-end designer sneaker in vibrant purple and white on a glass pedestal',
      username: 'SneakerHead_24',
      isBookmarked: true,
    },
    {
      id: '6',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy-vkV55qBc16VR-40yZGQKOlt6w5fBRxhKGeVXJrtPJu68NvbEjULgxJ-B9WbB-rBJLEJtB7agosP-mtRWNLDS7JSkngC4B2meM9i1ZesCgl4oPQgCJtrwwLM46D_TaMlp-OGJOOdn1xipL-xsXct0-SOe7CQoHBr0fIsSWzhQc4-fRA_x-LgTs44OrQHA0hirpK6WjzhMOr1M52bu2Zj5ssULf7_VmojIL4fG6mjEVQshMA1yMizLQRZKX-qud_2nfEVAI',
      imageAlt: 'Modern living room filled with vibrant green plants and purple neon accent lights',
    },
    {
      id: '7',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCujiQoNll1FyRj-Rl1VMzcIHhVRp7VaWFjZK3inqz93bcMgEbEZ3nFEgt8vU_QwxEwTkH_Zl5H_eZfAXXlW4Om2Z9tjwEHngjh2DZG7fxm-krCMxuILG9F-0_9uV9UTmWb-u37zlcN4mDBC3JQafaZw03OvtrW6lGrDtOejpQwSyc54vjHpHF7pxrQeCXxnFux7I_t2MCLTPGglYmTUGXJnAD7DLfxdm6ilJilCVlBck8Tq3Vp7V2XZIMzxgiJMgj3PRQiaGHTZwI',
      imageAlt: 'Concert crowd silhouetted against an intense purple and pink light show',
    },
    {
      id: '8',
      cardType: 'standard',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP4YMgmTzfApJmJwlIGYKkzwFJ4hy4u-DxbWeyc3lRnDE05cLpxpaIesdLhBn5ArMqLg1-czttn97tIIqu8dsl1IGLwn_l1bJE0472p2JGZ6de-xqvRZwaXokhWiUFNA0u9L-y2SK9Ucaz2vW860cu4TAhqAFer6BJPEko-DphB3WXzZq4UvBdxklh2-DtJSLrV1fQQNlyBlzPW29-kTYje8AJTdssv8v-UAoGGLH4DaHgM5I0j-qQqNa8SdPMniQ5yt5UScyP7kk',
      imageAlt: 'Minimalist flat-lay of a tablet with stylus, coffee, and a succulent on a lilac surface',
      tag: '#CreativeProcess',
    },
  ];

  private _categoriesSubject = new BehaviorSubject<Category[]>(this._categories);
  private _postsSubject = new BehaviorSubject<TrendPost[]>(this._posts);

  getCategories(): Observable<Category[]> {
    return this._categoriesSubject.asObservable();
  }

  getPosts(): Observable<TrendPost[]> {
    return this._postsSubject.asObservable();
  }

  selectCategory(selectedId: string): void {
    const updated = this._categoriesSubject.value.map(c => ({
      ...c,
      active: c.id === selectedId,
    }));
    this._categoriesSubject.next(updated);
  }
}
