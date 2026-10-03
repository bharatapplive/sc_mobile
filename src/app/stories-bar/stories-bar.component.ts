import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular/lazy';
import { StoryGroup, StoryService } from '../core/services/story.service';
import { AuthService } from '../core/services/auth.service';
import { mediaUrl } from '../core/utils/media-url';

const STORY_DURATION = 5000; // har story 5 second

@Component({
    selector: 'app-stories-bar',
    standalone: true,
    imports: [IonicModule],
    templateUrl: './stories-bar.component.html',
    styleUrls: ['./stories-bar.component.scss'],
})
export class StoriesBarComponent implements OnInit, OnDestroy {
    groups = signal<StoryGroup[]>([]);
    uploading = signal(false);
    error = signal('');
    me = this.auth.currentUser;
    mediaUrl = mediaUrl;

    // full-screen viewer
    viewerOpen = signal(false);
    groupIndex = signal(0);
    storyIndex = signal(0);
    currentGroup = computed(() => this.groups()[this.groupIndex()]);
    currentStory = computed(() => this.currentGroup()?.stories[this.storyIndex()]);
    private timer: any;

    constructor(private storyService: StoryService, private auth: AuthService) { }

    ngOnInit() {
        this.load();
    }

    ngOnDestroy() {
        clearTimeout(this.timer);
    }

    load() {
        this.me = this.auth.currentUser;
        const myId = this.me?._id;
        this.storyService.getStories().subscribe({
            next: (groups) => {
                // apni stories sabse pehle
                groups.sort((a, b) => (a.author._id === myId ? -1 : b.author._id === myId ? 1 : 0));
                this.groups.set(groups);
                this.error.set('');
            },
            error: () => this.error.set('Could not load stories'),
        });
    }

    isMine(authorId: string) {
        return authorId === this.me?._id;
    }

    onFilePicked(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        input.value = '';
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            this.error.set('Image must be under 5 MB');
            return;
        }
        this.uploading.set(true);
        this.storyService.create(file).subscribe({
            next: () => {
                this.uploading.set(false);
                this.load();
            },
            error: () => {
                this.uploading.set(false);
                this.error.set('Could not upload story');
            },
        });
    }

    open(index: number) {
        this.groupIndex.set(index);
        this.storyIndex.set(0);
        this.viewerOpen.set(true);
        this.startTimer();
    }

    close() {
        clearTimeout(this.timer);
        this.viewerOpen.set(false);
    }

    next() {
        const group = this.currentGroup();
        if (!group) return this.close();
        if (this.storyIndex() < group.stories.length - 1) {
            this.storyIndex.update((i) => i + 1);
        } else if (this.groupIndex() < this.groups().length - 1) {
            this.groupIndex.update((i) => i + 1);
            this.storyIndex.set(0);
        } else {
            return this.close(); // sab stories khatam
        }
        this.startTimer();
    }

    prev() {
        if (this.storyIndex() > 0) {
            this.storyIndex.update((i) => i - 1);
        } else if (this.groupIndex() > 0) {
            this.groupIndex.update((i) => i - 1);
            this.storyIndex.set(this.currentGroup()!.stories.length - 1);
        }
        this.startTimer();
    }

    deleteCurrent() {
        const story = this.currentStory();
        if (!story) return;
        clearTimeout(this.timer);
        this.storyService.delete(story._id).subscribe({
            next: () => {
                this.close();
                this.load();
            },
        });
    }

    timeAgo(date: string) {
        const m = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
        if (m < 1) return 'just now';
        if (m < 60) return `${m}m`;
        return `${Math.floor(m / 60)}h`;
    }

    private startTimer() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.next(), STORY_DURATION);
    }
}