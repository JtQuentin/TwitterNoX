import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchForm: FormGroup;
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private fb: FormBuilder, private searchService: SearchService) {
    this.searchForm = this.fb.group({
      searchForm: [''],
    });
  }

  search() {
    const query = this.searchForm.value.searchForm.trim();
  
    if (query.length > 0) {
      this.searchService.search(query).subscribe(
        (results) => {
          this.searchResults = results;
        },
        (error) => {
          console.error('Erreur lors de la recherche', error);
        }
      );
    } else {
    }
  }
  
}
