# rnm-blog
PHP Academy course project

Bugs:

*** Frontend=>register.component.html=>line 143:
'Passwords don't match' is not shown, if ValidatePasswordConfirmation fails.

*** Register and Login modals backend errors are displayed in closed modals.

*** After adding new comment all comments for the post are updated, 
but if switch to another post, component updates and adding new comments is not working properly.
If component was destroyed and then open new post, everything is ok.