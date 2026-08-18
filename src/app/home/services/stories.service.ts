import {Injectable} from '@angular/core';
import { Story } from '../models/feed.model';
@Injectable({
  providedIn: 'root'
})
export class StoriesService {
    private stories: Story[] = [
    {
      id: 1,
      username: 'Your Story',
      avatarUrl: 'assets/ai_img.png',
      isCurrentUser: true,
      altText: 'A portrait of a trendy Gen-Z creator'
    },
    {
      id: 2,
      username: 'alex_vibe',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHRi2-QhqqHpB_7BDvc9gqBi41cVDvXGyWahFdHvx5valgXZu4CNqVG-63xYsHRoZxfcqW8jsb8v3LqjP6tjk0CntOABI9j4eUWNtHiJ4WhjqhTHPX4yr8-zXZr8K7Y56lr1QYN-h1jntrJpSm_nBAF1BVWOQdOdn7OfWJY-wA_OujyY2ZtUffzVZf44QMLGcQmb-P3mnbWlp2n9ub_M8W3jCj04Mtu_QngNOg3p5gqeZ00WoVy38kARhkH_LwyihDXN565uQ44c',
      hasUnreadStory: true,
      altText: 'A close-up shot of a young artist working in a studio'
    },
    {
      id: 3,
      username: 'neo_pixel',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4K6UQl8YeKnRlYyIDiquAUTWhbTD7uhwPjKbnUymtss9SBPtqSwhz49am_QUusP0hq0BCRdwV-1n4maK76ZHZpz9fc5iV8vpqbJiUrUjiTFkiaAsbgEWs533oGa3zMIIYVZviHlxf8_635qeq22fxqXcRecOmBJDmGuMQw8MYuXPX3XQtZ4H7tr4lILvvwn9uPkFsIbqq4HMMsEf_i7mlXraO05B7YZwA_wS2dRQUAHzX8xR-LV9VVL5qmOQ30PCArNcjOfrj1No',
      hasUnreadStory: true,
      altText: 'A stylish urban explorer standing on a rooftop'
    },
    {
      id: 4,
      username: 'luna.art',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD97OZyo9vcgdGRd6eFUx4FiL7ww4LY9areHnQZHPzWqwv-r7I2NKJIAZnJaOJrEzfn_hUQ9VWx2bIluVg-ROYwuj-6C8Q_5L6S4mzwK9b22SYx9rnaP1iLKAKYz44MdwibsoSSmrBCmBSmBGX_knwkDKgMid99ryMeKc2eU0koiPlPRT2Q1Qp6H5knrBDrhdNpw_SP3u-PVumwBTHGCOoEuqHvineDkFfKHgr3yNhLERA17_1f-kRvzVONqqdS-z6wOSYWOLgJy4s',
      hasUnreadStory: true,
      altText: 'A high-fashion model posing in a minimalist white space'
    },
    {
      id: 5,
      username: 'travel_joy',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByww0uE6lke2FnrYFMVZzWGb_W99pu6A1lsmf0NifQFgWXG_43MKKbr74wKZmjEoON1H68ZYtRDckqav2JvLRYu8eG0BeOx7Iu5NYjEmwT3cZSG4W3gDzvSUvHAg11P97N9sY2lWdowEyPQob1FT7kLUc33jwbYbbCGTO2kxUw0rNM2xy0QSGe-6Mh5p9PXSbfM_H5dhAHPHhiZOqZXZ3dnkNdR0yRjZqa6JwRa_tpfEWqG3jc9LAnr_54YmVRmz66ahHqJNwV-Zo',
      hasUnreadStory: true,
      altText: 'A travel blogger sitting in a modern cafe'
    },
  ];

  getStories(): Story[] {
    return this.stories;
  }
}