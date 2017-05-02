# Custom Sidenav

A modified version of the angular material's sidenav component. Unlike the other one, this one pushes the content container and has a defined structure with 3 levels of items.

## How to use

Place the files inside a folder in your project and inject them into your index.html (you know that).

After this,  add `custom-sidenav` as a dependency in your angular app.

```javascript
angular.module('app', ['custom-sidenav']);
```

Now we can call our sidenav in some html file like this:

```html
<div layout-fill flex layout="row">
	<!-- Menu -->
	<custom-sidenav 
		template-url="app/libraries/custom-sidenav/custom-sidenav.html"
		options="vm.sidenavOptions"></custom-sidenav>
	<!-- /Menu -->
	<!-- Main content -->
	<md-content layout="column" layout-fill flex>
		<div ui-view layout-fill flex></div>
	</md-content>
	<!-- /Main content -->
</div>
```

Notice that this sctructure already has the `custom-sidenav` directive and a place for our `ui-view` too.

The `custom-sidenav` directive takes two arguments: the template url of our component and an object of options. This object comes from our controller and is responsible for defining the menu tree and some other configurations like the place where the icons are and some event handlers:

```javascript
vm.sidenavOptions = {
    menuTitleText: 'The Menu Title',
    menuTitleArrowIcon: {
        left: 'menu_title_arrow_left.svg',
        right: 'menu_title_arrow_right.svg'
    },
    iconsPackageUrl: 'src/assets/img',
    clickOutsideToClose: true,
    onNavigateToStateError: function () {
        console.error('Something wrong happened!');
    },
    items: [
        {
            label: 'Users',
            itemIcon: 'users.svg',
            state: 'users',
        },
        {
            label: 'Products',
            itemIcon: 'products.svg',
            menu: {
                items: [
                    {
                        label: 'List',
                        state: 'listproducts',
                    },
                    {
                        label: 'Add',
                        state: 'addproduct',
                    }
                ]
            }
        },
        {
            label: 'Events',
            itemIcon: 'events.svg',
            menu: {
                items: [
                    {
                        label: 'List',
                        state: 'listevents',
                    },
                    {
                        label: 'Postponed',
                        menu: {
                            items: [
                                {
                                    label: 'List',
                                    state: 'listpostponed',
                                }
                            ]
                        }
                    }
                ]
            }
        }			    
    ]
}; 
```

If you want additional informations about it I suggest you take look at the demo folder.

### Notes

* It's not working properly for mobile devices yet.

---
MIT Licensed