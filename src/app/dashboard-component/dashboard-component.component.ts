import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { TagSearchServiceService } from '../tag-search-service.service';
import { Tag } from '../tag';
import { Media } from '../media';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {
  
  tags: Observable<Tag[]>;
  media: Observable<Media[]>;
  errorMessage: string;
  tagName: string;
  tagCount: number;
  private searchTerms = new Subject<string>();

  constructor(private tagSearchService: TagSearchServiceService) { }
  
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  
  ngOnInit() {
    this.tags = this.searchTerms
      .debounceTime(500)        // wait for 500ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.tagSearchService.searchTag(term)
        // or the observable of empty tags if no search term
        : Observable.of<any[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<any[]>([]);
      });
  }

  selectTag(tag: any): void {
    this.tags = Observable.of<any[]>([]);
    this.ngOnInit();
    this.tagName = '# ' + tag.name;
    this.tagCount = tag.media_count;

    this.media = this.tagSearchService
          .searchMedia(tag.name);

  }

}
