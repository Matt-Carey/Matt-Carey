import { Config } from 'https://mattcarey.com/SnailEngine/engine/src/config.js';
import { Engine } from 'https://mattcarey.com/SnailEngine/engine/src/engine.js';

global.nodeimports = await import('./modules.mjs');
global.crypto = await import('crypto');

;(function() {
	console.log('Command Line Args:', process.argv)

	const gameIndex = process.argv.indexOf('--game') + 1;
	if(gameIndex == 0) {
		console.log("Missing game path! Use --game followed by path to game directory.");
		return;
	}

	const worldIndex = process.argv.indexOf('--world') + 1;
	if(worldIndex == 0) {
		console.log("Missing world name! Use --world flag followed by name of world.");
		return;
	}

	const { fs } = global.nodeimports;

	const gamePath = process.argv[gameIndex];
	if (!fs.existsSync(gamePath)) {
		console.log("Game directory cannot be found at ", gamePath);
		return;
	}

	const worldFile = process.argv[worldIndex];
	const worldPath = gamePath + "/" + worldFile;
	if(!fs.existsSync(worldPath)) {
		console.log("World file cannot be found at ", worldPath);
		return;
	}

	global.gamePath = gamePath;

	Engine.init().then(engine => {
		engine.world.load(worldFile);
	});

})();
