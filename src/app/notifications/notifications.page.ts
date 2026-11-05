import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

type NotificationKind = 'like' | 'comment' | 'follow' | 'mention';
type NotificationFilter = 'all' | 'mentions';

interface CircleNotification {
  id: number;
  username: string;
  avatar: string;
  kind: NotificationKind;
  message: string;
  time: string;
  unread: boolean;
  following?: boolean;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class NotificationsPage {
  filter: NotificationFilter = 'all';
  readonly notifications: CircleNotification[] = [
    {
      id: 1,
      username: 'riya.sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      kind: 'like',
      message: 'liked your photo.',
      time: '12 min',
      unread: true,
    },
    {
      id: 2,
      username: 'arjun.frames',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces',
      kind: 'comment',
      message: 'commented: “This is such a vibe ✨”',
      time: '1 hr',
      unread: true,
    },
    {
      id: 3,
      username: 'meera.inbloom',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&h=120&fit=crop&crop=faces',
      kind: 'follow',
      message: 'started following you.',
      time: '3 hr',
      unread: false,
      following: false,
    },
    {
      id: 4,
      username: 'kabir.creates',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces',
      kind: 'mention',
      message: 'mentioned you in a comment.',
      time: 'Yesterday',
      unread: false,
    },
  ];

  get visibleNotifications(): CircleNotification[] {
    return this.filter === 'mentions'
      ? this.notifications.filter((notification) => notification.kind === 'mention')
      : this.notifications;
  }

  setFilter(filter: NotificationFilter): void {
    this.filter = filter;
  }

  markAllRead(): void {
    this.notifications.forEach((notification) => (notification.unread = false));
  }

  toggleFollow(notification: CircleNotification): void {
    notification.following = !notification.following;
  }

  trackNotification(_: number, notification: CircleNotification): number {
    return notification.id;
  }
}
