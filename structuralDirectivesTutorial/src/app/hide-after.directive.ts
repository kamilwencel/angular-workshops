import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

/*
Structural directives is actions.
*/


@Directive({
  selector: '[appHideAfter]'
})
export class HideAfterDirective implements OnInit {

  // default argument to directive
  // we can create by name or by input argument
  // @Input('appHideAfter') delay = 0;
  // @Input() appHideAfter = 0;
  @Input() appHideAfter = 0;

  // We need to name input as -> directiveName + camelcase argument
  // *appHideAfter="5000; then placeholder" -> 'appHideAfterThen'
  @Input('appHideAfterThen') placeholder: TemplateRef<any> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<any>
    ) { }


  ngOnInit(): void {
    this.renderTemplate(this.template);

    setTimeout(()=>{

      // Remove template from the view
      this.viewContainerRef.clear();

      if(this.placeholder){
        this.renderTemplate(this.placeholder);
      }

    },this.appHideAfter)

  }

  private renderTemplate(template: TemplateRef<any>){

    // render template inside ng-template container
    this.viewContainerRef.createEmbeddedView(template);
  }
  
}
