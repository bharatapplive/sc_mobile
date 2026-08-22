import { Component } from '@angular/core';

import { addIcons } from 'ionicons';

import {
  cameraOutline,
  heartOutline,
  menuOutline,
  add,
  linkOutline,
  personAddOutline,
  gridOutline,
  playCircleOutline,
  personOutline,
  heart,
  layersOutline,
  homeOutline,
  searchOutline,
  addCircleOutline,
  person
} from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {

  activeTab: 'posts' | 'reels' | 'tagged' = 'posts';

  posts = [
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtch-yCmHYeIqOTUu8DiMs2tT-3uX-y9VNGp8q50-NCjydwbkx4i2V9IZv-8x92r-s5vquaS7ZHha0_IhQ_FDv31ABimU0lwuzZFMbmriYx78HXyh2gOx7L-wjM36tblNB_v6Ny297oJF4cGsL4mSCmcY5bb-WOZtms_fEibtbJRyI-TMt1KiUhk8qjdqq19dBGfXxFk7fIlEJ_SalaQJ7vw3XElGj3_Bo3GPGXcoGwc_umvsxpXWu',
      likes: '1.2K',
      type: 'post'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsatpR4hL_nuVkRgjys8SkOdtaEsyTdoU01aIEzX_A3kevd0Ul-o_k7infw88uFCqeUxmnwJFMQyxg4SD9fMzzN7aEpVkYswCjT2VJpzxzZaItK-BqVR49NvvizjzK7SZN56ob88LpE_KB3YTvKMAo2o6WBD0iOG7VgiLuBdfT9KUSdDGi4y-XCxYxwVA2df3SAfIHAI5mQYt-Mp2rQpbKhL763JHqkInnJd3Rv114MPMLJou0pQMR',
      likes: '842',
      type: 'multiple'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdPHThCOnfE-NgDTuLS6ArDwUFkcPzCBwk4wbLSlWRIBcxjPZeLGnos3CSW3s4Z5hsd1iHYM1AGz9mx972phzY51GC3YQSxrbri-SbPjX18zsEoe59QV973fsOcs_ZJ2cTx5KFTdXNhhB-8nakooJhGwHcO3ba3JU0UXKLgLnVlPU6ykWfubyIIvbOzWSL1yAk9szCIp5dL2UcU0e7PjOX3RwFjExJU33Ec8lJnlwagu-0bbY-wSwa',
      likes: '2.5K',
      type: 'post'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2ytixu2Rsp-u3T9aBOXZN_N1vXYW5hvvHkgGbxEQ8S94owO9bGPcvwuBzb97yyeCy6vgXE2EgO3YVdZGwPlqhShm8RU1th2rZBck-IvfkGnD_-QlVEHPjo9ypSZWMSyK7BMNkOqN3Js_4Uk0_TdS-px3J6MalY-NUb5K-J_IDRMSiA5eTmgJwhoYYBQ5WGRZ61EySDLkPMTaOpyBjrfVCX71JZ4Wa0FNRd0dqAyUvd3ark_mDNDm0',
      likes: '610',
      type: 'post'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzB4uW2I5U9-BJxL-RkR1ivANSy0T4Gt4sfDkTd4BFwuCDhEvH2xLH1qid3NPM5tsNHXOzgJ-s-F1YYsZZG4Lly0MkWaQqcqhmjNYJL87fTyzJz2-lDeFwwnB7iRXHvIZsNI8G_1sm0oLM_yp-QSf2JmbNHJ0zRg-L1KEtt3s_OyTpoJMJV8FGIMqNcSSeiKk5lnRvTUpKFkanfzcdV_D6x0nORK1ObJS8Vdp-U3LyZoEhbDZLH3Nn',
      likes: '1.5K',
      type: 'reel'
    }
  ];

  constructor() {

    addIcons({
      cameraOutline,
      heartOutline,
      menuOutline,
      add,
      linkOutline,
      personAddOutline,
      gridOutline,
      playCircleOutline,
      personOutline,
      heart,
      layersOutline,
      homeOutline,
      searchOutline,
      addCircleOutline,
      person
    });

  }

  changeTab(tab: 'posts' | 'reels' | 'tagged') {
    this.activeTab = tab;
  }

  openNotifications() {
    console.log('Notifications');
  }

  openMenu() {
    console.log('Menu');
  }

}