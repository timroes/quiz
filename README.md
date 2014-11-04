Quiz
====

This is a web based application to host a quiz.

How to use
----------

*Requirements: Python (2.7+), Modern Browser*

If you just want to use it (and not developing for it) you can just download
the most recent release from the [release page](../../releases).

Unzip the file to a folder of your choice. You can now create multiple quizes
in the `quizes` subdirectory (see below).

To start the game, execute the `server.py` script. It will output an URL, that you
can now open in a modern browser (most browsers will go into fullscreen on <kbd>F11</kbd>).

### Create quizes

To create a new quiz, create a new folder (with a name of your choice) in the `quizes`
directory (no matter if you are using a downloaded version or if you are developing
with the source code).

Place a file named `quiz.json` inside that directory. This JSON files describes your quiz
and looks as follows:

```JSON
{
  "title": "Title of the quiz",
  "items": [
  	...
  ]
}
```

The `items` array contains all the questions (and similiar) in the order
they should appear in the quiz. Each item is an object, that has to have at
least a `type` key. Depending on the `type` it must or can have other fields.

#### Item types

The following item `type`s exists and can/must have the following fields:

* `interlude` - A title like screen (that is no question).
  * `title` - The title that should be shown on the interlude screen.
  * `subtitle` (optional) - A subtitle that should be shown below.
* `image` - A question inside an image.
  * `image` - A path (relative or absolute) to the image.
  * `points` - An amount of points that will be awared for the answer to this question.
  * `solution` - The solution to the question.
  * `label` (optional) - A label (like a question) that will be shown above the image.
  * `source` (optional) - A source (or copyright) of the image. Will be shown subtle below the image.

### Play the game

When opening the game URL you can choose one of the quizes you created.

#### Settings

On the top right of the screen you can open the **Settings** dialog.
You can set the keys used to control the game in there. These keys will be
referred to as <kbd>next</kbd>, <kbd>correct</kbd>, <kbd>wrong</kbd> and <kbd>end game</kbd> key later.

Settings will be saved even when you refresh, restart your browser or the server.

#### Teams

You can add as many teams as you need on the top left.

If you press the icon on the bottom right of a team box, you get into the team settings.

You can change the team name, manually adjust a teams points, set a buzzer key for that team
or delete the team from the game.

#### Controls

While you are in a game, you can control the game as follows:

Press <kbd>next</kbd> during the title screen, an *interlude* or when a solution is shown to jump to
the next question. When pressing <kbd>next</kbd> while a question is shown, it will show the solution
without awarding the points to any team.

When a question is shown the teams can press their buzzer keys if they want to solve it.
The team box of the team, that buzzered first will be colored. If the team answered correctly
press the <kbd>correct</kbd> key. The team will be awared by the specific amount of points and the
answer will be shown. If the team answered wrong press the <kbd>wrong</kbd> key. The team will be
blocked from buzzing for a specific amount of time (indicated by a red progress line in the team
box).

If either the last question has been reached or at any time you press the <kbd>end game</kbd> button,
the game ends and the result will be shown.

How to develop
--------------

*Requirements: NodeJS, npm, Modern Browser*

To develop the game make sure you have NodeJS and gulp (`npm install -g gulp`) installed.

Using Ubuntu you also need the nodejs-legacy package.

All dependencies will be installed automatically if you do a `npm install` in the root directory of this project.

Use `gulp` or `gulp serve` to run the game and watch for changes (except changes on the quizes).

Use `gulp package` to package a zip file with your current quizes.
