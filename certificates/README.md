## How to Generate Developer token
1. Access to [Identifiers](https://developer.apple.com/account/resources/identifiers/list) on Apple Developer.
1. Create a new Music ID.
1. Move to [Keys](https://developer.apple.com/account/resources/authkeys/list) page.
1. Generate a key for your new Music ID and download `.p8` file.
1. Get your Key ID from your generated key detail page.
1. Get Team ID of your Apple Developer.(It is on right-top on the page)  
1. Rename your `.p8` file to `cert.p8`, and move it to `certificates` directory.
1. Fill `config.example.json` and rename it to `config.json`.
1. run `yarn run generate-token` and you're ready to go!
