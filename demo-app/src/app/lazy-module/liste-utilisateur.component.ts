import { Component, OnInit } from '@angular/core';

@Component({
  template: `<h1>Liste des utilisateurs</h1>`
})
export class ListeUtilisateurComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Liste des utilisateurs` component');
  }

}
