OroEmbeddedFormBundle
=====================

The Bundle provides mechanism to create forms, embed them into third party sites, store and view data submitted via them.
Basically an `EmbeddedForm` is a `FormType`. Also it contains custom css and a success message.

## UI
The menu item that leads to the list of embedded forms is under the `System` menu.
To list, view and update pages standard UI components are used - grids, filters, sorters, forms.
The view page is combined with the "Form Preview" and "Get code" sections.

## Adding new FormType
The FormTypes that can be used in embedded forms are registered as services and tagged with the `oro_embedded_form` tag.

**Example:**
```yml
parameters:
    acme_demo.form.embedded_form.class: Acme\Bundle\DemoBundle\Form\Type\SomeFormType

services:
    acme_demo.form.embedded_form:
        class: %acme_demo.form.embedded_form.class%
        tags:
            - { name: oro_embedded_form, label: 'Embedded Form Type Label Here' }
            - { name: form.type, alias: acme_demo_some_form_type }
```

The `label` option is a translatable text used in the select box when creating/updating an embedded form. If omitted, the service id will be used instead.

The other possible option is `type`. If it is defined then it will be used as the form type (instead of the actual service defined by `class` parameter).
This kind of form types appear in the drop-down list on the create and update embedded form pages.

## Default FormType CSS and Success Message
By default, the CSS and Success Message fields on the create new embedded form page are empty.
To add default styles or a default success message, a FormType must implement `Oro\Bundle\EmbeddedFormBundle\Form\Type\EmbeddedFormInterface`.

## Changing FormType
It is possible to change the embedded form FormType on/after creation.
The related default styles and the default success message will be pulled. If current css and success message are changed - a confirmation dialog will appear.

## Success Message
This message will appear after a successful form submitting.
You can customize the success message on the create and update embedded form pages.
It is possible to set your text for the back link by adding it in the in the `{back_link}` placeholder using following syntax `{back_link|Back link text}`.

## Get a Code
The "Get code" section is located on the view embedded form page. Example:

```html
<div id="embedded-form-container-2b975a6c-844f-11e3-a31b-001fe24ecc11"></div>
<script type="text/javascript" src="http://example.com/bundles/oroembeddedform/js/embed.form.js"></script>
<script type="text/javascript">
    new EmbedForm({
        container: 'embedded-form-container-2b975a6c-844f-11e3-a31b-001fe24ecc11',
        iframe: {
            src: "http://example.com/embedded-form/submit/2b975a6c-844f-11e3-a31b-001fe24ecc11",
            width: 640,
            height: 800,
            frameBorder: 0
        }
    });
</script>
```
The `iframe` object properties will be directly mapped onto create iframe element properties. So, it possible to change the iframe sizes or add/remove the frame border.

## Custom form layout
For backward compatibility, the legacy mechanism of customizing the embedded form layout is supported:
for this a FormType should implement `Oro\Bundle\EmbeddedFormBundle\Form\Type\CustomLayoutFormInterface`.

However, it is advisable to use the Layouts engine from the Oro LayoutBundle to customize the form layout.
Embedded forms use the `embedded_form` layout theme and layout update files should be placed in `Acme\Bundle\DemoBundle\Resources\layouts\embedded_form` directory.

Layout update files can be placed in a subdirectory corresponding to a route name (e.g. `oro_embedded_form_submit`, `oro_embedded_form_success`) if it needs to be applied a specific action only.
Please, refer to the [LayoutBundle](../LayoutBundle/README.md) documentation for more information.

Let's consider an example when we need to move the email field before the first name field on the embedded form:

**Example**
```yml
layout:
    actions:
        - @move:
            id:        embedded_form_email
            siblingId: embedded_form_firstName
            prepend:   true                     # place moved block before sibling

    conditions:
        @eq:
            - $context.embedded_form_type
            - 'acme_demo.form.embedded_form' # form type name in container
```

We need to specify layout update conditions since all embedded forms are using the same route.
The condition should check that your custom form type is equal to the form type stored in the layout context.
This will make sure that your layout updates are loaded only for your embedded form type.
