# react-tops

A React project designed to show optmistic render on the client
side while asynchronously calling the server for validation. This project
also has tests using [Jasmine][3], which are run on [Karma][4].

The client pools the server each second for a random word and shows the last
10 words. The user can submit new words, which will appear on the list
immediately and submited to the server.

The server has an artificial delay of 2 seconds before returning a response.
If the word has more than 6 characteres the server will tell that is a
invalid word and the client will show in a different manner valid and invalid
words.

## Dependencies

- java 1.7+
- [leiningen][1]
- [npm][5] (only for testing)

## Usage

1. Open a repl. In another terminal:

    ```bash
    $ lein repl
    ```

2. Require the core namespace. This will start the server. On the repl:

    ```
    user=> (require 'react-tops.core)
    ```

3. Go to [http://localhost:8003][2] in your browser.

## Testing

You need to install karma and some plugins before running the tests. In a terminal:

```bash
npm install karma karma-jasmine karma-chrome-launcher karma-firefox-launcher
```

You should also install karma-cli because it makes your life easier. In a terminal (you may need sudo):
```bash
npm install -g karma-cli
```

Now to run the tests:

1. Start the karma runner. In another terminal:

    ```bash
    $ karma start
    ```

2. When you save a file, the tests will auto run.

## License

Copyright © 2014, Marcelo Nomoto. All rights reserved.
```
The use and distribution terms for this software are covered by the Eclipse
Public License 1.0 (http://opensource.org/licenses/EPL-1.0) which can
be found in the file epl-v10.html at the root of this distribution. By using
this software in any fashion, you are agreeing to be bound by the terms of
this license. You must not remove this notice, or any other, from this software.
```
[1]: https://github.com/technomancy/leiningen
[2]: http://localhost:8003
[3]: https://jasmine.github.io
[4]: https://karma-runner.github.io/0.12/index.html
[5]: https://www.npmjs.org