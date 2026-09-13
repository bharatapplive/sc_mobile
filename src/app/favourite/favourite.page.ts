import { Location } from "@angular/common";
import { Component } from "@angular/core";

interface ActivityItem {
  username: string;
  avatar: string;
  text: string;
  time: string;
  thumbnail?: string;
  badge?: "heart" | "mention" | "bookmark";
}

@Component({
  selector: "app-favourite",
  templateUrl: "./favourite.page.html",
  styleUrls: ["./favourite.page.scss"],
  standalone: false,
})
export class FavouritePage {
  readonly followRequestAvatars = [
    {
      username: "creative_soul",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJFLSU08xEhS5mDsiUwmQpkN4wKn247sXC2dAN4Ll6nSC81ec8AMW4x4rhoanGlN0ZD315GOY3rdSGtj1LqrHhTglEjl8cRtbLG1XGNgb_z_TnLcjdqqaRhcwy0cy0aNFKxgwTQPI2xEuopvgj0IjArPQHXxUlOSe_PnI3ZuVNANwTbvdQuLX--edE-NGC9tjKwD-5gBxw4aQGS1beCfdOJ2rmno2PTE_CCzdflxGwmj0uNfvibRrSs0FJTrdbhcCED86VSIuzn8M",
    },
    {
      username: "alex_vibes",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAoogjfoyjwlfp0PTUaTGzO9S82fMTknjkFgFu3hSUU4Y8t-Z6ndiYyg9N0NawD4V-Fc1BwGQDHGL8ddqK0qA9g2_Ji_b4sQSGRqv38aGL6CDpDhMvjQkk_3WKC-9KXBvO0rIvGLWscPczwFtK92a5_1GHDhM9C1W6xuHLuCAu6-W34L4iAE--3KzeA8ZRi3-qDslTNB1JOnTaUj2JSQHkHmLDQzS7zZMlyLmXhct6JHzrGqmUnizx_ROI1Yqyo-J8sw_TJDPP_yv8",
    },
    {
      username: "neo_pixel",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4K6UQl8YeKnRlYyIDiquAUTWhbTD7uhwPjKbnUymtss9SBPtqSwhz49am_QUusP0hq0BCRdwV-1n4maK76ZHZpz9fc5iV8vpqbJiUrUjiTFkiaAsbgEWs533oGa3zMIIYVZviHlxf8_635qeq22fxqXcRecOmBJDmGuMQw8MYuXPX3XQtZ4H7tr4lILvvwn9uPkFsIbqq4HMMsEf_i7mlXraO05B7YZwA_wS2dRQUAHzX8xR-LV9VVL5qmOQ30PCArNcjOfrj1No",
    },
  ];

  readonly yesterday: ActivityItem[] = [
    {
      username: "creative_soul",
      avatar: this.followRequestAvatars[0].image,
      text: "and others liked your post.",
      time: "4h",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBmLGb7vfQlCMYgMw6_dxjvV2S8n602NQnJurBCYkF-DUmasGuXouXqcig2gD33CiP5P9RL2S_zzbgDwVW-gMW99qYRADXXqh6tcoRcl_1T5vdpNQzL_U-wlEB-Hvpia3eq4wdN5tdn2wQpmlz8CGD2FYCv0HGD9W7PlMAU8J50CoVcXpykmG4SByutTHKxjgeb7YUO_Otnn2KBTmMwB8hy_YtW8g92nz6JZWKP2RAk5gtXbmpFIH1HxNDyi6KkN8z8FRSApGpHcCU",
      badge: "heart",
    },
    {
      username: "neo_pixel",
      avatar: this.followRequestAvatars[2].image,
      text: "liked your story.",
      time: "13h",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB4K6UQl8YeKnRlYyIDiquAUTWhbTD7uhwPjKbnUymtss9SBPtqSwhz49am_QUusP0hq0BCRdwV-1n4maK76ZHZpz9fc5iV8vpqbJiUrUjiTFkiaAsbgEWs533oGa3zMIIYVZviHlxf8_635qeq22fxqXcRecOmBJDmGuMQw8MYuXPX3XQtZ4H7tr4lILvvwn9uPkFsIbqq4HMMsEf_i7mlXraO05B7YZwA_wS2dRQUAHzX8xR-LV9VVL5qmOQ30PCArNcjOfrj1No",
      badge: "heart",
    },
    {
      username: "luna.art",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD97OZyo9vcgdGRd6eFUx4FiL7ww4LY9areHnQZHPzWqwv-r7I2NKJIAZnJaOJrEzfn_hUQ9VWx2bIluVg-ROYwuj-6C8Q_5L6S4mzwK9b22SYx9rnaP1iLKAKYz44MdwibsoSSmrBCmBSmBGX_knwkDKgMid99ryMeKc2eU0koiPlPRT2Q1Qp6H5knrBDrhdNpw_SP3u-PVumwBTHGCOoEuqHvineDkFfKHgr3yNhLERA17_1f-kRvzVONqqdS-z6wOSYWOLgJy4s",
      text: "and others liked your reel.",
      time: "15h",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCMG7OTF-hz0ZCHSnk1I15XEprQ6fmoduxCWZb_RQVl-oYhXGyg9_xez0FVGlUFkyAV_98UEcXwlT-Zy3n-P3RLWVkWfCyDVOFXEZT5IQTjSIJxwao5NMW-jNPqs5IjnuX1zDlHel7N-TBrdOnErk2AEoOEt_kxbJCnJ4mYyYKWkoZBTZuhEeDENF8IffaR1a2NhJYNXP4yfXObxq124cTBv0Z5Lrmeo8FNPCVRDn_T4zWWTW_vUpoJ_cuV8mu2TZm7j_XtURIFiY",
      badge: "heart",
    },
    {
      username: "Jordan Smith",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAM_yfzjQYPRrh5pfGistHa-YLXlSLsALZOXKONJ3grBFFqnrutKo3oHWRotqMI34Rom_atqrhl_odg_06m2ga_S0WUhVRvetcPTvp2iM-cyzvw0vfb46QJpBN2JsXFrusDM53BOHQ091mMlWEYtU2vVQonrY4rDpJFzNtZt-jsQADz6iyyGYLEQQQs7JBdH2wbfLkDcVPp0dVr_vxa51Wo2m7if3KtgYGLoR1XdSg7-LXGGlMnaBctIe56vEa9HCPJVQdMH3MPt1Q",
      text: "mentioned you.",
      time: "Yesterday",
      badge: "mention",
    },
  ];

  readonly lastSevenDays: ActivityItem[] = [
    {
      username: "tech_minimalist",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCq_35yVxsU60yVA_lV64v4MZFfi1toL5QmpovPmZLiO6SOtQKotIE16uDb36Cqrroq2e4C234QsWVYuhjyuCIiiP3YApWMeKK5bOxxPSfcNw-RPSfdxzIoX7bw1yq3u0IIArHNfDf-IEILkG_u8nLLm9Gmv2hflFdhV-GkIWzgGNNdBeqJKq0w3MBw_5oje_XWLawcN8BXlmrf5TBSeiLJujn5-Zpw24Rf3h_ncXGGAd9NoGjLLhcB1U3reOyeXtP-iZttEIFomps",
      text: "saved your post.",
      time: "2d",
      thumbnail:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBCBLQH3bixXrdKXyFDqHnbf0PnWdwJaSRvAaC2y0KaT8tfVxiS21m7MfKFn66lGT2AJTaPwNcJeTzu0CwMhBIyks_ElUb5LeZ2Bke4hwJXCdR8rohYrkGG88RDiytBtSJvOtYZtCIyY5PRJzqVpgFgxOXvdXH-m_SVCRvJ5iN-QSairZed6oHTXQ1JbcDNwV2orOHv6H33oiZR83sNIUB9CuqMEsTSt9vbAw-KQn43L-7Z07p7s7CrsGf9kkM_Y26uyd1Hj3dyeqk",
      badge: "bookmark",
    },
    {
      username: "Marcus Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVTeF7TjfroLxJtf5ZcdLFyrrScEMa_BUu9yNhagpmlR01VxHhloSZOl9AbAC5XqES4dh4z5cqeAQWWcC4h-jKNsOc0lDBzw13jnORed6Aaae5ecFnra_HRm8uAzPHDmMo43Lq2X33o9J0Tgtmf0N46tnMnS-Ul3kGi9QsZiLIVKiEKI9tIskxd-AMEIKPzF0FsBMuX3VKGk7zJZ91Ob_ndVAVldq-nKfx7KS6EAEKo_VNj8LktMa5gZWtRYki36D68M5f26gWeZY",
      text: "liked your post.",
      time: "4d",
      badge: "heart",
    },
    {
      username: "Sarah Wilson",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAUYjRbGlzaSCVr3U1q0ZI6I5H9LNHzTroXnQzv2O0GghYnzdXsUtD2b5qkreny83yWqyj_qXK7EMx2dEhvmbY0huNbC-sW5FUn4tRnL8Lg_G860HvvqIKN86FRjivcY39dveuQpNe7Ypth9hRD4g2w0z9PPGd08UF6JTyvH9WOitwH7Zwjk0zswX-MaLZhlyKU5sGdsFlR5wJuRzs19Km6oFJN0Qtptz4skP0aVLhi85yuUA-64bPgc6FPHQVdOLSuIIj6k0Lopzk",
      text: "started following you.",
      time: "6d",
    },
  ];

  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
