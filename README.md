# Orderbot

# Requirements

1. Download node.js (I'm using v12.13.0, but probably any newer version would work).
  - [nodejs.org](https://nodejs.org/en/download/)

1. It should come with NPM installed.

1. You need aws credentials so orderbot can send you an email

```bash
$ cat ~/.aws/credentials

# you should see something like 
[default] ; default profile
aws_access_key_id = ABCDEFG12345
aws_secret_access_key = H+ABCDEFG12345
```

# Installation

1. Clone the git repo

    ```bash
    $ git clone https://github.com/codeandcodes/orderbot.git
    ```

1. Install packages and run
    ```bash
    $ cd orderbot
    $ npm install
    # modify email config in orderbot.js
    $ node orderbot.js
    ```

# Operation
- Orderbot will check the inventory page every second and then every hour will email you with the results. 
- It will email you that second if the inventory shows in stock. 
- It only emails you once so you need to be quick. Then it will reset and go back to notifying each hour.

# Notes
- Bestbuy seems to work.
- Walmart doesn't work. They use a captcha.
