import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CatalogPlaylistsComponent } from './catalog-playlists/catalog-playlists.component'
import { LibraryPlaylistsComponent } from './library-playlists/library-playlists.component'


const routes: Routes = [
  {
    path: 'library',
    component: LibraryPlaylistsComponent
  },
  {
    path: 'catalog',
    component: CatalogPlaylistsComponent
  },
  {
    path: '*',
    redirectTo: 'library'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
