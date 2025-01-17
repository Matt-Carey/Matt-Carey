import { AnimationMixer } from 'https://mattcarey.com/SnailEngine/engine/src/component/3d/model/animationMixer.js';
import { LoopOnce } from 'https://mattcarey.com/SnailEngine/engine/3rdparty/three.js/build/three.module.js';

class TrollAnimationMixer extends AnimationMixer {

    _onMixerReady() {
        super._onMixerReady();
        this.#playRandomAction();
    }

    #playRandomAction() {
        const actionNames = Object.keys(this.actions);
        const randomActionName = actionNames[Math.floor(Math.random()*actionNames.length)];
        const actionToPlay = this.actions[randomActionName];
        if(actionToPlay != null) {
            actionToPlay.reset();
            actionToPlay.setLoop(LoopOnce);
            actionToPlay.play();
        }
    }

    _onFinishedAnim(e) {
        super._onFinishedAnim(e);
        this.#playRandomAction();
    }
}

export { TrollAnimationMixer };
