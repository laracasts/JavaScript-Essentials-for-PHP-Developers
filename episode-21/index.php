<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript for PHP Developers - Episode 21</title>
    <script src="../assets/tailwind.js"></script>
    <link rel="stylesheet" href="../assets/site.css">
    
</head>
<body class="bg-gray-700 dark min-h-screen text-white">
    <div class="sticky top-0 z-50">
        <nav class="section md:!px-8 w-full py-3 bg-gray-950 border-b border-b-gray-700 mb-8 shadow-sm">
            <div class="relative h-full items-center">
                <div class="relative h-full flex justify-between">
                    <span class="text-xs font-bold uppercase text-gray-400">Episode 21: Filtering Input</span>       
                    <span class="text-xs font-bold uppercase text-gray-400">Laracasts</span>    
                </div>
            </div>
        </nav>
    </div>
    <div class="w-full p-6 bg-gray-800">
        <h1 class="text-2xl font-bold text-center mb-4">Game Settings</h1>
        <div class="w-full flex gap-2 justify-center">
            <form id="settings-form">

                <div class="mb-3">
                    <input type="radio" name="game-type-selector" id="game-type-mode" value="options-mode" checked> 
                        <label for="game-type-mode" class="mr-2">Mode</label>
                    <input type="radio" name="game-type-selector" id="game-type-custom" value="options-custom">
                        <label for="game-type-custom" class="mr-5">Custom</label>

                    <input type="checkbox" name="allow-duplicates-checkbox" id="allow-duplicates-checkbox">
                        <label for="allow-duplicates-checkbox">Allow duplicate guesses</label>

                </div>

                <div id="options-custom" class="hidden">
                    <input id="input-title" type="text" placeholder="Game Title" class="border p-2 w-40 bg-gray-900">
                    <input id="input-min-range" type="text" placeholder="Min Range" class="border p-2 w-24 bg-gray-900">
                    <input id="input-max-range" type="text" placeholder="Max Range" class="border p-2 w-24 bg-gray-900">
                    <input id="input-max-attempts" type="text" placeholder="Attempts" class="border p-2 w-24 bg-gray-900">
                </div>

                <div id="options-mode" class="inline">
                    <select name="game-level" id="game-level" class="border p-2 w-40 bg-gray-900">
                        <option data-min-range="1" data-max-range="10" data-attempts="10" value="easy">Easy</option>
                        <option data-min-range="1" data-max-range="20" data-attempts="7" value="medium">Medium</option>
                        <option data-min-range="1" data-max-range="100" data-attempts="5" value="hard">Hard</option>
                    </select>
                </div>
                

                <button name="play-game" id="play-game" class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4">
                    Play Game
                </button>
                <button name="clear-game" id="clear-game" class="bg-gray-500 hover:bg-gray-700 font-bold py-2 px-4">
                    Clear
                </button>
            </form>
        </div>
    </div>
    <script src="episode-21.js"></script>
</body>
</html>