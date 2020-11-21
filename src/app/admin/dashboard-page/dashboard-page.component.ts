import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSubscription: Subscription;
  deleteSubscription: Subscription;
  searchStr: string;

  constructor(private postService: PostService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string): void {
    this.deleteSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning('Post has been deleted!!!');
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
