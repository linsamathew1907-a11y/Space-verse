
  document.addEventListener('DOMContentLoaded', () => {
    // --- Web Audio API Kid-Friendly Sound Synthesizer & Telemetry Engine ---
    let audioCtx = null;
    let isMuted = false;
    let isVoiceEnabled = true;
    let ambientOscillator = null;
    let ambientGain = null;
    let speechDelayTimeout = null;

    // --- Web Speech API State: High-Pitch Childlike Astro Voice Engine ---
    let bestChildAstroVoice = null;
    let availableVoices = [];

    function populateVoices() {
      if (!('speechSynthesis' in window)) return;
      try {
        availableVoices = window.speechSynthesis.getVoices() || [];
        
        // Priority order for natural, clear, child-friendly or female higher-register voices
        const childVoicePreferences = [
          v => /Google US English/i.test(v.name),
          v => /Samantha/i.test(v.name),
          v => /Victoria/i.test(v.name),
          v => /Karen/i.test(v.name),
          v => /Zira/i.test(v.name),
          v => /Microsoft Jenny/i.test(v.name),
          v => /Microsoft Aria/i.test(v.name),
          v => /Natural/i.test(v.name) && v.lang.startsWith('en'),
          v => v.lang === 'en-US',
          v => v.lang.startsWith('en'),
          v => v.default
        ];

        for (const test of childVoicePreferences) {
          const match = availableVoices.find(test);
          if (match) {
            bestChildAstroVoice = match;
            break;
          }
        }
      } catch (err) {
        console.warn('SpeechSynthesis voice listing error', err);
      }
    }

    if ('speechSynthesis' in window) {
      populateVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = populateVoices;
      }
    }

    function initAudio() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playTone(freq, duration, type = 'sine', gainVal = 0.15) {
      if (isMuted || !audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        console.warn('Audio play error', e);
      }
    }

    function playChime() {
      initAudio();
      playTone(587.33, 0.2, 'triangle', 0.14); // D5
      setTimeout(() => playTone(739.99, 0.25, 'triangle', 0.16), 70); // F#5
      setTimeout(() => playTone(880.00, 0.35, 'triangle', 0.18), 150); // A5
      setTimeout(() => playTone(1174.66, 0.5, 'sine', 0.22), 230); // D6
    }

    function playChirp() {
      initAudio();
      playTone(987.77, 0.1, 'sine', 0.12);
      setTimeout(() => playTone(1318.51, 0.15, 'triangle', 0.1), 60);
    }

    function playEngineRumble() {
      initAudio();
      playTone(90, 0.6, 'sawtooth', 0.22);
      setTimeout(() => playTone(130, 0.5, 'square', 0.16), 100);
      setTimeout(() => playTone(180, 0.7, 'sawtooth', 0.18), 220);
    }

    function playFanfare() {
      initAudio();
      playTone(523.25, 0.2, 'triangle', 0.18);
      setTimeout(() => playTone(659.25, 0.2, 'triangle', 0.18), 110);
      setTimeout(() => playTone(783.99, 0.2, 'triangle', 0.2), 220);
      setTimeout(() => playTone(1046.50, 0.6, 'sine', 0.25), 330);
    }

    function startAmbientSynth() {
      if (isMuted || !audioCtx || ambientOscillator) return;
      try {
        ambientOscillator = audioCtx.createOscillator();
        ambientGain = audioCtx.createGain();
        ambientOscillator.type = 'sine';
        ambientOscillator.frequency.setValueAtTime(146.83, audioCtx.currentTime); // D3 cozy spaceship drone
        ambientGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        ambientOscillator.connect(ambientGain);
        ambientGain.connect(audioCtx.destination);
        ambientOscillator.start();
      } catch (e) {
        console.warn('Ambient synth error', e);
      }
    }

    function stopAmbientSynth() {
      if (ambientOscillator) {
        try {
          ambientOscillator.stop();
          ambientOscillator.disconnect();
        } catch(e) {}
        ambientOscillator = null;
      }
    }

    // --- Visual Speech Indicator state handlers ---
    const voiceWaveContainer = document.getElementById('astro-voice-wave-container');
    const speakingBadge = document.getElementById('astro-speaking-badge');
    const transmissionTag = document.getElementById('astro-transmission-tag');
    const voiceHeaderWaves = document.getElementById('voice-header-waves');
    const cockpitContainer = document.getElementById('cockpit-container');

    function setVisualSpeakingState(isSpeaking, isPausedBreathing = false) {
      if (isSpeaking) {
        voiceWaveContainer?.classList.remove('opacity-25', 'grayscale');
        voiceWaveContainer?.classList.add('opacity-100');
        if (speakingBadge) {
          speakingBadge.textContent = 'ASTRO SPEAKING 🌟';
          speakingBadge.className = 'absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-cyan-400 text-space-950 text-[9px] font-black tracking-tight border border-space-950 shadow-[0_0_8px_#00f7ff] animate-pulse';
        }
        if (transmissionTag) {
          transmissionTag.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span><span>ASTRO TRANSMITTING</span>';
        }
        if (voiceHeaderWaves) {
          voiceHeaderWaves.classList.remove('opacity-20');
          voiceHeaderWaves.classList.add('opacity-100');
        }
      } else if (isPausedBreathing) {
        voiceWaveContainer?.classList.add('opacity-40');
        voiceWaveContainer?.classList.remove('opacity-100');
        if (speakingBadge) {
          speakingBadge.textContent = 'PAUSE • 1s ⏳';
          speakingBadge.className = 'absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-space-950 text-[9px] font-black tracking-tight border border-space-950 shadow-[0_0_6px_#f59e0b]';
        }
        if (transmissionTag) {
          transmissionTag.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span><span>ASTRO LISTENING</span>';
        }
        if (voiceHeaderWaves) {
          voiceHeaderWaves.classList.add('opacity-40');
          voiceHeaderWaves.classList.remove('opacity-100');
        }
      } else {
        voiceWaveContainer?.classList.add('opacity-25', 'grayscale');
        voiceWaveContainer?.classList.remove('opacity-100');
        if (speakingBadge) {
          speakingBadge.textContent = isVoiceEnabled ? 'ASTRO READY' : 'MUTED';
          speakingBadge.className = 'absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-500 text-white text-[9px] font-black tracking-tight border border-space-950';
        }
        if (transmissionTag) {
          transmissionTag.innerHTML = isVoiceEnabled 
            ? '<span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span><span>ASTRO READY</span>'
            : '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span><span>VOICE OFF</span>';
        }
        if (voiceHeaderWaves) {
          voiceHeaderWaves.classList.add('opacity-20');
          voiceHeaderWaves.classList.remove('opacity-100');
        }
      }
    }

    // Speak Narration in high-pitch childlike tone with slower pace (Rate: 0.80, Pitch: 1.75) and 1-second pause
    function speakNarration(text) {
      if (!('speechSynthesis' in window)) return;
      try {
        clearTimeout(speechDelayTimeout);
        // Zero-buffer guarantee: immediately cancel any queued or in-flight speech
        window.speechSynthesis.cancel();

        if (!isVoiceEnabled || isMuted) {
          setVisualSpeakingState(false);
          return;
        }

        if (!bestChildAstroVoice) populateVoices();

        const utterance = new SpeechSynthesisUtterance(text);
        if (bestChildAstroVoice) {
          utterance.voice = bestChildAstroVoice;
        }

        // Childlike Voice Parameters:
        // pitch = 1.75 (high-pitched, energetic, friendly kid voice)
        // rate = 0.80 (gentle, deliberate speech delivery for kids)
        utterance.pitch = 1.75;
        utterance.rate = 0.80;
        utterance.volume = 1.0;

        utterance.onstart = () => {
          setVisualSpeakingState(true);
        };
        utterance.onend = () => {
          // Give a clear 1-second break / breathing room after each dialogue
          setVisualSpeakingState(false, true);
          speechDelayTimeout = setTimeout(() => {
            setVisualSpeakingState(false);
          }, 1000);
        };
        utterance.onerror = () => {
          setVisualSpeakingState(false);
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error', err);
        setVisualSpeakingState(false);
      }
    }

    function cancelSpeech() {
      clearTimeout(speechDelayTimeout);
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      setVisualSpeakingState(false);
    }

    // Cockpit Dials Dynamic Update
    function updateCockpitTelemetry(sceneIdx) {
      const altimeter = document.getElementById('cockpit-altimeter');
      const speed = document.getElementById('cockpit-speed');
      const speeds = ['48,200', 'W-SPEED', '32,150', '18,400', '27,580', '1,240'];
      const alts = ['850K', 'DEEP', 'SAT-R', 'BELT', '420KM', 'ORBIT'];

      if (altimeter && alts[sceneIdx]) altimeter.textContent = alts[sceneIdx];
      if (speed && speeds[sceneIdx]) speed.textContent = speeds[sceneIdx];

      // Add gentle vibration during launch scene & asteroid field
      if (sceneIdx === 0 || sceneIdx === 3) {
        cockpitContainer?.classList.add('animate-cockpit-rumble');
      } else {
        cockpitContainer?.classList.remove('animate-cockpit-rumble');
      }
    }

    // Audio & Voice Toggle Buttons in Cinematic Header
    const audioBtn = document.getElementById('btn-audio-toggle');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');

    const voiceBtn = document.getElementById('btn-voice-toggle');
    const voiceIcon = document.getElementById('voice-icon');
    const voiceLabel = document.getElementById('voice-label');
    const replayNarrationBtn = document.getElementById('btn-replay-narration');

    audioBtn?.addEventListener('click', () => {
      initAudio();
      isMuted = !isMuted;
      if (isMuted) {
        audioIcon.textContent = '🔇';
        audioLabel.textContent = 'Audio OFF';
        stopAmbientSynth();
        cancelSpeech();
      } else {
        audioIcon.textContent = '🔊';
        audioLabel.textContent = 'Audio ON';
        startAmbientSynth();
        playChirp();
        if (isVoiceEnabled) {
          speakNarration(scenes[currentSceneIndex].subtitle);
        }
      }
    });

    voiceBtn?.addEventListener('click', () => {
      isVoiceEnabled = !isVoiceEnabled;
      if (isVoiceEnabled) {
        voiceIcon.textContent = '🗣️';
        voiceLabel.textContent = 'Voice ON';
        voiceBtn.classList.remove('grayscale', 'opacity-60');
        playChirp();
        speakNarration(scenes[currentSceneIndex].subtitle);
      } else {
        voiceIcon.textContent = '🤐';
        voiceLabel.textContent = 'Voice OFF';
        voiceBtn.classList.add('grayscale', 'opacity-60');
        cancelSpeech();
      }
    });

    replayNarrationBtn?.addEventListener('click', () => {
      if (!isVoiceEnabled) {
        isVoiceEnabled = true;
        voiceIcon.textContent = '🗣️';
        voiceLabel.textContent = 'Voice ON';
        voiceBtn.classList.remove('grayscale', 'opacity-60');
      }
      playChirp();
      speakNarration(scenes[currentSceneIndex].subtitle);
    });

    // --- 6 Story Scenes Data (Highlighting 4 Key Celestial Wonders & Vibrant Galaxy Portal) ---
    const scenes = [
      {
        id: 0,
        name: "Welcome",
        subtitle: "Greetings, brave Space Cadet! Look up into the stars... I've been waiting for you!",
        sound: playChime
      },
      {
        id: 1,
        name: "Galaxy",
        subtitle: "Look out the window! That's a majestic glowing spiral galaxy with shimmering star clusters and colorful cyan and violet nebula clouds!",
        sound: playChirp
      },
      {
        id: 2,
        name: "Rings",
        subtitle: "Whoa, look at those majestic planetary rings! Millions of glistening ice crystals dancing under the sun with razor-sharp shadow divisions!",
        sound: playChirp
      },
      {
        id: 3,
        name: "Asteroids",
        subtitle: "Hold onto your seats! We're drifting through the ancient asteroid belt... look at those giant cratered space rocks tumbling by!",
        sound: playEngineRumble
      },
      {
        id: 4,
        name: "Earth",
        subtitle: "Prepare for orbital approach! Behold planet Earth with its deep cobalt oceans, golden deserts, swirling clouds, and glowing blue atmosphere!",
        sound: playChirp
      },
      {
        id: 5,
        name: "Space Academy & Vibrant Galaxy Portal",
        subtitle: "Docking clamps locked! Behold the vibrant cosmic galaxy portal and Space Academy. Your epic cosmic journey begins right now!",
        sound: playFanfare
      }
    ];

    let currentSceneIndex = 0;
    const totalScenes = scenes.length;
    let autoAdvanceTimer = null;
    let progressInterval = null;
    let progressPercent = 0;
    // Paced scene duration to allow for slower voice rate + 1000ms breathing pause
    const sceneDuration = 8800;

    // DOM Elements
    const introModal = document.getElementById('cinematic-intro-modal');
    const btnStart = document.getElementById('btn-start-adventure');
    const btnSkip = document.getElementById('btn-skip-intro');
    const btnPrev = document.getElementById('btn-scene-prev');
    const btnNext = document.getElementById('btn-scene-next');
    const btnQuickNext = document.getElementById('btn-quick-next');
    const btnEnterLobby = document.getElementById('btn-enter-lobby');
    const narrationSubtitle = document.getElementById('narration-subtitle');
    const progressFill = document.getElementById('timeline-progress-fill');
    const stepPills = document.querySelectorAll('.scene-step-pill');
    const sceneItems = [
      document.getElementById('scene-1'),
      document.getElementById('scene-2'),
      document.getElementById('scene-3'),
      document.getElementById('scene-4'),
      document.getElementById('scene-5'),
      document.getElementById('scene-6')
    ];

    function showScene(index) {
      if (index < 0) index = 0;
      if (index >= totalScenes) {
        closeIntroModal();
        return;
      }

      // Immediately cancel any previous scene speech
      cancelSpeech();

      currentSceneIndex = index;

      // Update scene visuals visibility
      sceneItems.forEach((sceneEl, idx) => {
        if (idx === index) {
          sceneEl.classList.remove('opacity-0', 'pointer-events-none');
          sceneEl.classList.add('opacity-100', 'pointer-events-auto');
        } else {
          sceneEl.classList.add('opacity-0', 'pointer-events-none');
          sceneEl.classList.remove('opacity-100', 'pointer-events-auto');
        }
      });

      // Update Subtitle with subtle fade
      if (narrationSubtitle) {
        narrationSubtitle.classList.add('opacity-40');
        setTimeout(() => {
          narrationSubtitle.textContent = `"${scenes[index].subtitle}"`;
          narrationSubtitle.classList.remove('opacity-40');
        }, 120);
      }

      // Update Progress Step Pills
      stepPills.forEach((pill, idx) => {
        if (idx === index) {
          pill.className = "scene-step-pill px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border transition-all cursor-pointer bg-cyan-400 text-space-950 border-cyan-300 shadow-[0_0_12px_#00f7ff]";
        } else if (idx < index) {
          pill.className = "scene-step-pill px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border transition-all cursor-pointer bg-purple-900/80 text-purple-200 border-purple-400/50";
        } else {
          pill.className = "scene-step-pill px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border transition-all cursor-pointer bg-space-900/80 text-white/70 border-white/20 hover:border-cyan-400/60";
        }
      });

      // Update Prev / Next Buttons state
      if (btnPrev) {
        btnPrev.disabled = (index === 0);
      }

      // Update Cockpit Dials & Rumble
      updateCockpitTelemetry(index);

      // Play scene sound effects
      if (scenes[index].sound) {
        scenes[index].sound();
      }

      // Trigger instant, zero-buffer childlike voice narration with higher pitch & slower delivery
      speakNarration(scenes[index].subtitle);

      // Restart auto-advance timer
      restartTimer();
    }

    function restartTimer() {
      clearInterval(progressInterval);
      clearTimeout(autoAdvanceTimer);
      progressPercent = 0;
      if (progressFill) progressFill.style.width = '0%';

      const stepInterval = 50;
      const totalSteps = sceneDuration / stepInterval;

      progressInterval = setInterval(() => {
        progressPercent += (100 / totalSteps);
        if (progressFill) {
          progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
        }
        if (progressPercent >= 100) {
          clearInterval(progressInterval);
          // Insert a 1-second break / pause before auto-advancing to the next scene
          setVisualSpeakingState(false, true);
          autoAdvanceTimer = setTimeout(() => {
            if (currentSceneIndex < totalScenes - 1) {
              showScene(currentSceneIndex + 1);
            }
          }, 1000);
        }
      }, stepInterval);
    }

    function openIntroModal() {
      initAudio();
      startAmbientSynth();
      playChime();
      introModal.classList.remove('opacity-0', 'pointer-events-none');
      introModal.classList.add('opacity-100', 'pointer-events-auto');
      showScene(0);
    }

    function closeIntroModal() {
      cancelSpeech();
      stopAmbientSynth();
      clearInterval(progressInterval);
      clearTimeout(autoAdvanceTimer);
      clearTimeout(speechDelayTimeout);
      introModal.classList.remove('opacity-100', 'pointer-events-auto');
      introModal.classList.add('opacity-0', 'pointer-events-none');
      cockpitContainer?.classList.remove('animate-cockpit-rumble');
      playChirp();
    }

    // Button event listeners
    btnStart?.addEventListener('click', () => {
      openIntroModal();
    });

    btnSkip?.addEventListener('click', () => {
      closeIntroModal();
    });

    btnEnterLobby?.addEventListener('click', () => {
      closeIntroModal();
    });

    btnPrev?.addEventListener('click', () => {
      if (currentSceneIndex > 0) {
        showScene(currentSceneIndex - 1);
      }
    });

    btnNext?.addEventListener('click', () => {
      if (currentSceneIndex < totalScenes - 1) {
        showScene(currentSceneIndex + 1);
      } else {
        closeIntroModal();
      }
    });

    btnQuickNext?.addEventListener('click', () => {
      if (currentSceneIndex < totalScenes - 1) {
        showScene(currentSceneIndex + 1);
      } else {
        closeIntroModal();
      }
    });

    // Direct step pill click
    stepPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const stepNum = parseInt(pill.getAttribute('data-scene-step'), 10);
        showScene(stepNum);
      });
    });

    // Keyboard controls (Arrow keys and Space)
    document.addEventListener('keydown', (e) => {
      if (introModal.classList.contains('opacity-100')) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          if (currentSceneIndex < totalScenes - 1) {
            showScene(currentSceneIndex + 1);
          } else {
            closeIntroModal();
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (currentSceneIndex > 0) {
            showScene(currentSceneIndex - 1);
          }
        } else if (e.key === 'Escape') {
          closeIntroModal();
        }
      }
    });

    // Pause timer on subtitle hover
    const subtitlesBar = document.querySelector('[data-purpose="story-subtitles-bar"]');
    subtitlesBar?.addEventListener('mouseenter', () => {
      clearInterval(progressInterval);
      clearTimeout(autoAdvanceTimer);
    });
    subtitlesBar?.addEventListener('mouseleave', () => {
      restartTimer();
    });

    // Tactile button feel
    const interactiveButtons = document.querySelectorAll('button');
    interactiveButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add('brightness-125');
        setTimeout(() => {
          btn.classList.remove('brightness-125');
        }, 150);
      });
    });

  });
