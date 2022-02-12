import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

/*
Structural directives is actions.
*/

class HideAfterContext{
  //$implicit will be default value for a template
  public $implicit = 1000;
  // to use keyword -> as <- we need to name proparty same as @Input
  public appHideAfter = 0;
  public counter = 0;
}


@Directive({
  selector: '[appHideAfter]'
})
export class HideAfterDirective implements OnInit {

  // default argument to directive
  // we can create by name or by input argument
  // @Input('appHideAfter') delay = 0;
  // @Input() appHideAfter = 0;
  @Input('appHideAfter')
  set delay(value: number | null){
    this._delay = value ?? 0; 
    this.context.appHideAfter = this.context.counter = this._delay / 1000;
  }

  private _delay = 0;

  // We need to name input as -> directiveName + camelcase argument
  // *appHideAfter="5000; then placeholder" -> 'appHideAfterThen'
  @Input('appHideAfterThen') placeholder: TemplateRef<HideAfterContext> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<HideAfterContext>
    ) { }

  private context = new HideAfterContext();


  ngOnInit(): void {
    this.renderTemplate(this.template);

    const intervalId = setInterval(()=>{
      this.context.counter--;
    },1000)

    setTimeout(()=>{
      clearInterval(intervalId);
      // Remove template from the view
      this.viewContainerRef.clear();

      if(this.placeholder){
        this.renderTemplate(this.placeholder);
      }

    },this._delay)

    

  }

  private renderTemplate(template: TemplateRef<HideAfterContext>){

    // render template inside ng-template container
    this.viewContainerRef.createEmbeddedView(template, this.context);
  }

  static ngTemplateContextGuard(dir: HideAfterDirective,ctx:unknown): ctx is HideAfterContext{
    return true;
  }
  
}
