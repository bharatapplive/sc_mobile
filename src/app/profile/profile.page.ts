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
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt76Ebf09s0j0dBMDZ4iGvPTLxTN6mADTmk7KS2kWQJylIHJEdBBsWe1yl3CO2j1PDCoTbqcwHjpaMWgWIL-H3n614giGGPpQAjc6tb7JQr2zpw2Db3UmX0EHua88rA1vu_vsEViUuJFb-1ZpwH9jGUIApXsd7OewCbeqxBiFbyxWeeQTQ7N6LJo62mD-UEs7Ul4Rh-b3X_EwIvVOpmCMcbgf0AYQXwCmuKw0KVHjSjAz5cE7JdF--',
      likes: '935',
      type: 'post'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl1LcSm69_nRHd8pQTXdQn0znGudFZKOXewkYujWZafls19o8YBOnkqo4nbUwCKbqmbYnDTKKajJOe4_mC2boUYhERVGo14FVvXrf1OaymNFx3DFPxVu5dAHjy3nJU6si-sIetak1vzTHyeDUhF3KrVu-7R21iod_p4pVgfPZ44Jd0fiOrhyxnQvoqt-0Cu_hagLT67bsPV7XAzOavS2iGOcsQU-bh8-jS0P8D4gqkj4l90a7NG-RH',
      likes: '420',
      type: 'post'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY5T6m50Gy9iFqL1B9ht74YEW-37g7wZYGiXfu2wgX_Sgjk7mKxPMzAB60RMFaaXjVD9HUQk1R_QSGIUPMFHoyw4M-mvud5zLiRyo2LgLhYHAnOJOtz9jQo2ht_6PKMl9WPT4GfZomzUHXEhUsAI6AmW4PzwdCeUrSFKCpT2FWzbX6ygzH6994RevEW5euwxhHA3WQkh_9CgM7jh8aAelEDPdCrToG90RYnmw4tVnrJHLbjwgHSGej',
      likes: '1.1K',
      type: 'multiple'
    },
    {
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuisqNNTNr4uPXDMavMAecBy0dTE2eM7lnST3Z9Ql5JtdXBeoswYIsMILMQKVzyXYSSbl5qFXzeRLfhxNWUCJIM4t7cUWfHrnFEFWGOfPGQ0vTxeXPcuNEN22UF5thboWFxOf8lugoPjGRWljLTCR0E3blm-n6znzf5gFjwKRNS1y6l8nWboIPcGfhwNInIy2I2ZkI2l-2F2HBZG_6mqBsl8NRmqXv_qqjWu_rGhUyFGioFJRFu3gX',
      likes: '755',
      type: 'post'
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