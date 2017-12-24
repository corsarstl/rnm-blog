# rnm-blog
PHP Academy course project

Bugs:

***. Frontend=>register.component.html=>line 143:
'Passwords don't match' is not shown, if ValidatePasswordConfirmation fails.

***. When show single post get error: ERROR TypeError: Cannot read property 'some value' of undefined 
at Object.View_PostComponent_0._co as updateDirectives. 

Possible solutions to asynchronous method: 

https://reformatcode.com/code/typescript/typeerror-cannot-read-property-39taxtypeid39-of-undefined-at-objectviewfulledittaxcomponent0co-as-updatedirectives

https://reformatcode.com/code/typescript/quoterror-uncaught-in-promise-typeerror-cannot-read-property-39length39-of-undefinedquot

***. Register and Login modals backend errors are displayed in closed modals.