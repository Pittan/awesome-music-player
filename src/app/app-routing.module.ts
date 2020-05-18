import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CatalogPlaylistsComponent } from './catalog-playlists/catalog-playlists.component'
import { LibraryPlaylistsComponent } from './library-playlists/library-playlists.component'
import { LicenseComponent } from './license/license.component'


const routes: Routes = [
  {
    path: '',
    component: LibraryPlaylistsComponent
  },
  {
    path: 'library',
    component: LibraryPlaylistsComponent
  },
  {
    path: 'catalog',
    component: CatalogPlaylistsComponent
  },
  {
    path: 'license',
    component: LicenseComponent
  },
  {
    path: '*',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
