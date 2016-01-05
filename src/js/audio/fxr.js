// Modified version of https://github.com/mneubrand/jsfxr

/**
 *
 * Copyright 2010 Thomas Vian
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author Thomas Vian
 */
const defaults = {
  waveType: 1,

  masterVolume: 0.5,
  attackTime: 0,
  sustainTime: 0.3,
  sustainPunch: 0.3,
  decayTime: 0.4,

  compressionAmount: 0.3,

  startFrequency: 0.3,
  minFrequency: 0,

  slide: 0,
  deltaSlide: 0,

  vibratoDepth: 0,
  vibratoSpeed: 0,

  changeAmount: 0,
  changeSpeed: 0,

  squareDuty: 0,
  dutySweep: 0,

  repeatSpeed: 0,

  phaserOffset: 0,
  phaserSweep: 0,

  lpFilterCutoff: 1,
  lpFilterCutoffSweep: 0,
  lpFilterResonance: 0,

  hpFilterCutoff: 0,
  hpFilterCutoffSweep: 0
};

export default class Synth {
  constructor( options ) {
    Object.assign( this, defaults, options );
  }
}
