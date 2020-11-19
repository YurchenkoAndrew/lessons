import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {Post} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSubscription: Subscription;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.postsSubscription = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }
  }

  remove(id: string): void {

  }
}
