// ============================================================
// 書道場 — Main Game Engine
// Handles all game logic, audio, UI, and Hanzi Writer integration
// ============================================================

const GAME_I18N = {
  zh: {
    titleSubtitle: 'Shodo Dojo — 繁體字書寫修行',
    titleDesc: '挑戰道場前輩，練返一手好字',
    enterDojo: '進入道場',
    rulesTitle: '📜 書道七則 — 筆順基本規律',
    btnBack: '返回',
    selectStage: '選擇修行階段',
    btnLoadBank: '📂 載入題庫',
    btnGenerator: '📝 題庫產生器',
    btnBackEntrance: '返回入口',
    watchDemo: '觀看示範',
    btnDemo: '▶️ 示範',
    btnStartWrite: '✏️ 開始書寫',
    btnNext: '➡️ 下一個',
    hintsTitle: '💡 提示',
    hintPlaceholder: '撳下面個掣攞提示',
    btnGetHint: '💡 攞提示（-10分）',
    btnListen: '🔊 聽讀音',
    labelJyutping: '粵拼',
    labelMeaning: '意思',
    labelRadical: '部首',
    labelStrokes: '筆畫',
    statScore: '總分',
    statChars: '完成字數',
    statMistakes: '總失誤',
    statHints: '使用提示',
    statPerfects: '完美書寫',
    btnRetry: '🔄 再次挑戰',
    btnNextLevel: '➡️ 下一關',
    btnSelectLevel: '📋 選擇關卡',
    btnBackLobby: '🏠 返回大廳',
    settingsTitle: '⚙️ 設定',
    quitTitle: '確定要退出？',
    quitDesc: '而家嘅進度唔會保存㗎。',
    btnConfirmQuit: '確定退出',
    btnContinue: '繼續修行'
  },
  en: {
    titleSubtitle: 'Shodo Dojo — Chinese Character Writing',
    titleDesc: 'Challenge dojo opponents, master your strokes',
    enterDojo: 'Enter Dojo',
    rulesTitle: '📜 7 Stroke Order Rules',
    btnBack: 'Back',
    selectStage: 'Select Stage',
    btnLoadBank: '📂 Load Bank',
    btnGenerator: '📝 Generator',
    btnBackEntrance: 'Back',
    watchDemo: 'Watch Demo',
    btnDemo: '▶️ Demo',
    btnStartWrite: '✏️ Start Writing',
    btnNext: '➡️ Next',
    hintsTitle: '💡 Hints',
    hintPlaceholder: 'Press the button below for a hint',
    btnGetHint: '💡 Get Hint (-10pts)',
    btnListen: '🔊 Listen',
    labelJyutping: 'Jyutping',
    labelMeaning: 'Meaning',
    labelRadical: 'Radical',
    labelStrokes: 'Strokes',
    statScore: 'Score',
    statChars: 'Characters',
    statMistakes: 'Mistakes',
    statHints: 'Hints Used',
    statPerfects: 'Perfects',
    btnRetry: '🔄 Retry',
    btnNextLevel: '➡️ Next Level',
    btnSelectLevel: '📋 Select Level',
    btnBackLobby: '🏠 Lobby',
    settingsTitle: '⚙️ Settings',
    quitTitle: 'Quit this level?',
    quitDesc: 'Current progress will not be saved.',
    btnConfirmQuit: 'Quit',
    btnContinue: 'Continue'
  }
};

class ShodoDojo {
  constructor() {
    this.state = {
      currentScreen: 'title-screen',
      currentLevel: null,
      currentCharIndex: 0,
      characters: [],
      score: 0,
      totalMistakes: 0,
      charMistakes: 0,
      hintsUsed: 0,
      hintsUsedTotal: 0,
      perfectCount: 0,
      levelsCompleted: JSON.parse(localStorage.getItem('shodo-levels') || '{}'),
      levelScores: JSON.parse(localStorage.getItem('shodo-scores') || '{}'),
      showStrokeDemo: true,
      showOutline: true
    };

    this.demoWriter = null;
    this.quizWriter = null;
    this.audioCtx = null;
    this.bgmNodes = null;
    this.bgmVolume = 0.3;
    this.sfxVolume = 0.5;
    this.voiceEnabled = true;
    this.lang = 'zh';

    this.init();
  }

  // ── Initialization ──────────────────────────────────────
  init() {
    this.updateLevelCards();
    this.populateRules();
    this.initAudio();
  }

  // ── Screen Management ───────────────────────────────────
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.add('active');
      screen.classList.add('screen-enter');
      setTimeout(() => screen.classList.remove('screen-enter'), 400);
    }
    this.state.currentScreen = screenId;

    if (screenId === 'level-select') {
      this.updateLevelCards();
    }
    if (screenId === 'title-screen') {
      this.startBGM();
    }
  }

  // ── Level Select ────────────────────────────────────────
  updateLevelCards() {
    const levels = ['level1', 'level2', 'level3'];
    levels.forEach((lvl, i) => {
      const card = document.getElementById('level-card-' + (i + 1));
      const scoreEl = document.getElementById('score-' + lvl);
      const data = CHARACTER_DB[lvl];
      const isUnlocked = i === 0 || this.state.levelsCompleted['level' + i];

      if (isUnlocked) {
        card.classList.remove('locked');
        const lockEl = card.querySelector('.lock-overlay');
        if (lockEl) lockEl.style.display = 'none';
      }

      if (this.state.levelScores[lvl] !== undefined) {
        scoreEl.textContent = '最高分：' + this.state.levelScores[lvl];
      } else {
        scoreEl.textContent = '';
      }
    });

    // Update custom level card
    if (CHARACTER_DB.custom) {
      const card = document.getElementById('level-card-custom');
      if (card) card.style.display = '';
      const scoreEl = document.getElementById('score-custom');
      if (scoreEl && this.state.levelScores.custom !== undefined) {
        scoreEl.textContent = '最高分：' + this.state.levelScores.custom;
      }
    }
  }

  // ── Start Level ─────────────────────────────────────────
  startLevel(levelKey) {
    if (levelKey !== 'custom') {
      const levelIndex = parseInt(levelKey.replace('level', ''));
      const isUnlocked = levelIndex === 1 || this.state.levelsCompleted['level' + (levelIndex - 1)];
      if (!isUnlocked) return;
    }

    const data = CHARACTER_DB[levelKey];
    if (!data) return;

    // Shuffle and pick characters
    const shuffled = [...data.characters].sort(() => Math.random() - 0.5);
    this.state.characters = shuffled;
    this.state.currentLevel = levelKey;
    this.state.currentCharIndex = 0;
    this.state.score = 0;
    this.state.totalMistakes = 0;
    this.state.hintsUsedTotal = 0;
    this.state.perfectCount = 0;

    this.showScreen('game-screen');
    this.setupOpponent();
    this.showDialogue('greeting');
    this.updateGameUI();

    // Small delay then present first character
    setTimeout(() => this.presentCharacter(), 2000);
  }

  // ── Opponent Setup ──────────────────────────────────────
  setupOpponent() {
    const opponentKey = this.state.currentLevel === 'custom' ? 'level1' : this.state.currentLevel;
    const opponent = OPPONENTS[opponentKey];
    if (!opponent) return;

    document.getElementById('opponent-name').textContent = opponent.name;

    // Set avatar color
    const body = document.querySelector('#game-screen .avatar-body');
    if (body) body.style.background = opponent.avatar.body;

    this.setExpression('greeting');
  }

  setExpression(mood) {
    const el = document.getElementById('avatar-expression');
    const moods = {
      greeting: '😊',
      challenge: '🤨',
      mock: '😏',
      praise: '😄',
      perfect: '😲',
      angry: '😤',
      proud: '😌',
      hint: '🤔'
    };
    el.textContent = moods[mood] || '😊';
  }

  showDialogue(category) {
    const text = getDialogue(this.state.currentLevel, category);
    const el = document.getElementById('dialogue-text');
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = text;
      el.style.opacity = 1;
    }, 150);
  }

  // ── Present Character ───────────────────────────────────
  presentCharacter() {
    const chars = this.state.characters;
    const idx = this.state.currentCharIndex;
    if (idx >= chars.length) {
      this.finishLevel();
      return;
    }

    const charData = chars[idx];
    this.state.charMistakes = 0;
    this.state.hintsUsed = 0;

    // Update info panel
    document.getElementById('char-emoji').textContent = charData.emoji;
    document.getElementById('char-display-big').textContent = charData.char;
    document.getElementById('char-jyutping').textContent = charData.jyutping;
    document.getElementById('char-meaning').textContent = charData.meaningZh + ' (' + charData.meaning + ')';
    document.getElementById('char-radical').textContent = charData.radical + ' — ' + charData.radicalName;
    document.getElementById('char-strokes').textContent = charData.strokeCount + ' 畫';

    // Reset hints
    document.getElementById('hints-list').innerHTML = '<p class="hint-placeholder">撳下面個掣攞提示</p>';
    document.getElementById('btn-hint').disabled = false;

    // Show buttons
    document.getElementById('btn-demo').style.display = '';
    document.getElementById('btn-start-quiz').style.display = '';
    document.getElementById('btn-next').style.display = 'none';

    // Update progress
    this.updateGameUI();

    // Dialogue
    this.showDialogue('challenge');
    this.setExpression('challenge');

    // Speak the character
    if (this.voiceEnabled) {
      setTimeout(() => this.speakCharacter(), 500);
    }

    // Create demo writer
    this.createDemoWriter(charData.char);

    // Auto-play demo if enabled
    if (this.state.showStrokeDemo) {
      document.getElementById('writing-status').textContent = '觀看示範';
      document.getElementById('demo-container').style.display = '';
      document.getElementById('quiz-container').style.display = 'none';
      setTimeout(() => this.playDemo(), 800);
    } else {
      // Skip demo, go straight to quiz
      document.getElementById('btn-demo').style.display = '';
      this.createQuizWriter(charData.char);
    }
  }

  // ── Hanzi Writer: Demo ──────────────────────────────────
  createDemoWriter(char) {
    const container = document.getElementById('hanzi-demo');
    container.innerHTML = '';

    const size = this.getWriterSize();
    try {
      this.demoWriter = HanziWriter.create(container, char, {
        width: size,
        height: size,
        padding: 10,
        showOutline: this.state.showOutline,
        showCharacter: false,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 400,
        strokeColor: '#1a1a1a',
        outlineColor: '#ddd',
        drawingColor: '#c41e3a',
        radicalColor: '#c41e3a',
        charDataLoader: function(char, onComplete, onError) {
          fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/' + encodeURIComponent(char) + '.json')
            .then(function(r) { return r.json(); })
            .then(onComplete)
            .catch(function(e) { console.error('Failed to load char data:', char, e); if (onError) onError(e); });
        }
      });
    } catch (e) {
      console.error('Failed to create demo writer:', e);
    }
  }

  createQuizWriter(char) {
    const container = document.getElementById('hanzi-quiz');
    container.innerHTML = '';

    const size = this.getWriterSize();
    try {
      this.quizWriter = HanziWriter.create(container, char, {
        width: size,
        height: size,
        padding: 10,
        showOutline: this.state.showOutline,
        showCharacter: false,
        showHintAfterMisses: 3,
        highlightOnComplete: true,
        strokeColor: '#1a1a1a',
        outlineColor: '#ddd',
        drawingColor: '#1a1a1a',
        highlightColor: '#c41e3a',
        drawingWidth: 6,
        charDataLoader: function(char, onComplete, onError) {
          fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/' + encodeURIComponent(char) + '.json')
            .then(function(r) { return r.json(); })
            .then(onComplete)
            .catch(function(e) { console.error('Failed to load char data:', char, e); if (onError) onError(e); });
        }
      });
    } catch (e) {
      console.error('Failed to create quiz writer:', e);
    }
  }

  getWriterSize() {
    const vw = window.innerWidth;
    if (vw <= 600) return 220;
    if (vw <= 900) return 260;
    return 300;
  }

  playDemo() {
    if (!this.demoWriter) return;

    document.getElementById('demo-container').style.display = '';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('writing-status').textContent = '觀看示範';
    document.getElementById('btn-start-quiz').style.display = '';

    this.demoWriter.hideCharacter();
    this.demoWriter.animateCharacter({
      onComplete: () => {
        document.getElementById('writing-status').textContent = '示範完成 — 準備開始書寫';
      }
    });
  }

  // ── Hanzi Writer: Quiz ──────────────────────────────────
  startQuiz() {
    const charData = this.state.characters[this.state.currentCharIndex];
    if (!charData) return;

    document.getElementById('demo-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = '';
    document.getElementById('writing-status').textContent = '✏️ 請書寫：' + charData.char;
    document.getElementById('btn-demo').style.display = '';
    document.getElementById('btn-start-quiz').style.display = 'none';

    this.createQuizWriter(charData.char);

    this.quizWriter.quiz({
      onMistake: (strokeData) => this.handleMistake(strokeData),
      onCorrectStroke: (strokeData) => this.handleCorrectStroke(strokeData),
      onComplete: (summaryData) => this.handleComplete(summaryData)
    });
  }

  handleMistake(strokeData) {
    this.state.charMistakes++;
    this.state.totalMistakes++;
    this.playSFX('wrong');
    this.showStrokeFeedback('✗', false);
    this.showDialogue('mock');
    this.setExpression('mock');

    // Shake opponent
    const avatar = document.getElementById('opponent-avatar');
    avatar.classList.add('opponent-shake');
    setTimeout(() => avatar.classList.remove('opponent-shake'), 400);
  }

  handleCorrectStroke(strokeData) {
    this.playSFX('correct');
    this.showStrokeFeedback('✓', true);
  }

  handleComplete(summaryData) {
    const mistakes = summaryData.totalMistakes;
    const hintsUsed = this.state.hintsUsed;
    const charScore = Math.max(0, 100 - (mistakes * 20) - (hintsUsed * 10));
    this.state.score += charScore;

    if (mistakes === 0 && hintsUsed === 0) {
      this.state.perfectCount++;
      this.showDialogue('perfect');
      this.setExpression('perfect');
      this.showStrokeFeedback('完美！', true);
    } else {
      this.showDialogue('praise');
      this.setExpression('praise');
      this.showStrokeFeedback('+' + charScore, true);
    }

    // Bounce animation
    const avatar = document.getElementById('opponent-avatar');
    avatar.classList.add('opponent-happy');
    setTimeout(() => avatar.classList.remove('opponent-happy'), 500);

    document.getElementById('writing-status').textContent = '✅ 完成！得分 +' + charScore;
    document.getElementById('btn-next').style.display = '';
    document.getElementById('btn-demo').style.display = 'none';

    this.updateGameUI();
  }

  // ── Next Character ──────────────────────────────────────
  nextCharacter() {
    this.state.currentCharIndex++;
    if (this.state.currentCharIndex >= this.state.characters.length) {
      this.finishLevel();
    } else {
      this.presentCharacter();
    }
  }

  // ── Finish Level ────────────────────────────────────────
  finishLevel() {
    const levelKey = this.state.currentLevel;
    const data = CHARACTER_DB[levelKey];
    const isCustom = levelKey === 'custom';
    // Custom stages always count as passed to encourage practice
    const passed = isCustom ? true : (this.state.score >= data.passScore);

    // Save progress
    if (passed && !isCustom) {
      this.state.levelsCompleted[levelKey] = true;
      localStorage.setItem('shodo-levels', JSON.stringify(this.state.levelsCompleted));
    }

    // Save high score
    const prev = this.state.levelScores[levelKey] || 0;
    if (this.state.score > prev) {
      this.state.levelScores[levelKey] = this.state.score;
      localStorage.setItem('shodo-scores', JSON.stringify(this.state.levelScores));
    }

    // Show results
    this.showScreen('results-screen');

    const stamp = document.getElementById('results-stamp');
    const title = document.getElementById('results-title');
    const dialogue = document.getElementById('results-dialogue');
    const nextBtn = document.getElementById('btn-next-level');

    if (isCustom) {
      // Custom stage: always positive, tiered encouragement
      const score = this.state.score;
      const perfects = this.state.perfectCount;
      const total = this.state.characters.length;
      const ratio = total > 0 ? perfects / total : 0;

      stamp.style.color = 'var(--correct-green)';
      stamp.style.borderColor = 'var(--correct-green)';
      nextBtn.style.display = 'none';

      if (ratio >= 0.8) {
        stamp.textContent = '優';
        title.textContent = '🌟 完美表現！';
        dialogue.textContent = '你寫得太好喇！每一筆都好有功力，繼續保持！';
      } else if (ratio >= 0.5) {
        stamp.textContent = '良';
        title.textContent = '🎉 表現出色！';
        dialogue.textContent = '好叻呀！大部分字都寫得好靚，再練多幾次一定更加好！';
      } else if (score > 0) {
        stamp.textContent = '進';
        title.textContent = '💪 繼續進步！';
        dialogue.textContent = '每次練習都係進步！你已經做得好好，繼續加油！';
      } else {
        stamp.textContent = '練';
        title.textContent = '✏️ 好的開始！';
        dialogue.textContent = '萬事起頭難，你踏出咗第一步！多練幾次就會越寫越好㗎！';
      }
    } else if (passed) {
      stamp.textContent = '合';
      stamp.style.color = 'var(--correct-green)';
      stamp.style.borderColor = 'var(--correct-green)';
      title.textContent = '🎉 修行通過！';
      this.showDialogue('levelComplete');
      dialogue.textContent = getDialogue(levelKey, 'levelComplete');

      // Show next level button if not last level
      const levelNum = parseInt(levelKey.replace('level', ''));
      if (levelNum < 3) {
        nextBtn.style.display = '';
      } else {
        nextBtn.style.display = 'none';
      }
    } else {
      stamp.textContent = '未';
      stamp.style.color = 'var(--wrong-red)';
      stamp.style.borderColor = 'var(--wrong-red)';
      title.textContent = '修行未通過…';
      dialogue.textContent = getDialogue(levelKey, 'levelFail');
      nextBtn.style.display = 'none';
    }

    // Result avatar
    const resultExpr = document.getElementById('result-expression');
    resultExpr.textContent = (passed || isCustom) ? '😊' : '😤';

    // Stats
    document.getElementById('result-score').textContent = this.state.score;
    document.getElementById('result-chars').textContent = this.state.characters.length;
    document.getElementById('result-mistakes').textContent = this.state.totalMistakes;
    document.getElementById('result-hints').textContent = this.state.hintsUsedTotal;
    document.getElementById('result-perfects').textContent = this.state.perfectCount;
  }

  retryLevel() {
    if (this.state.currentLevel) {
      this.startLevel(this.state.currentLevel);
    }
  }

  goNextLevel() {
    const num = parseInt(this.state.currentLevel.replace('level', ''));
    if (num < 3) {
      this.startLevel('level' + (num + 1));
    }
  }

  // ── Custom Stage ────────────────────────────────────────
  loadCustomStage(data) {
    if (!data || !data.characters || !data.characters.length) return;

    CHARACTER_DB.custom = {
      name: data.name || '自訂關卡',
      nameEn: data.nameEn || 'Custom Stage',
      subtitle: data.subtitle || data.name || '自訂關卡',
      subtitleEn: data.subtitleEn || data.nameEn || 'Custom Stage',
      description: data.description || '自訂嘅練習題庫',
      descriptionEn: data.descriptionEn || 'Custom question bank',
      requiredScore: 0,
      passScore: data.passScore || 1200,
      characters: data.characters
    };

    // Show custom card in level select
    const card = document.getElementById('level-card-custom');
    if (card) {
      card.style.display = '';
      const title = document.getElementById('custom-level-title');
      const desc = document.getElementById('custom-level-desc');
      if (title) title.textContent = CHARACTER_DB.custom.name;
      if (desc) desc.textContent = CHARACTER_DB.custom.description + ' (' + data.characters.length + ' 字)';
    }

    // Update score display
    if (this.state.levelScores.custom !== undefined) {
      const scoreEl = document.getElementById('score-custom');
      if (scoreEl) scoreEl.textContent = '最高分：' + this.state.levelScores.custom;
    }
  }

  loadCustomFromFile() {
    document.getElementById('custom-file-input').click();
  }

  handleCustomFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let text = e.target.result;
        // Support both JS (CUSTOM_STAGE = {...}) and JSON formats
        let data;
        if (text.trim().startsWith('{')) {
          data = JSON.parse(text);
        } else {
          // Extract object from JS variable assignment
          const match = text.match(/(?:const|let|var)\s+\w+\s*=\s*(\{[\s\S]*\});?\s*$/);
          if (match) {
            data = JSON.parse(match[1]);
          }
        }
        if (data && data.characters) {
          localStorage.setItem('shodo-custom-stage', JSON.stringify(data));
          this.loadCustomStage(data);
        }
      } catch (err) {
        console.error('Failed to load custom stage:', err);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  // ── Hints ───────────────────────────────────────────────
  showHint() {
    const charData = this.state.characters[this.state.currentCharIndex];
    if (!charData) return;

    const hintIndex = this.state.hintsUsed;
    if (hintIndex >= charData.hints.length) {
      document.getElementById('btn-hint').disabled = true;
      return;
    }

    this.state.hintsUsed++;
    this.state.hintsUsedTotal++;
    this.playSFX('hint');
    this.showDialogue('hint');
    this.setExpression('hint');

    const listEl = document.getElementById('hints-list');
    if (hintIndex === 0) {
      listEl.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = 'hint-item';
    item.textContent = charData.hints[hintIndex];
    listEl.appendChild(item);

    if (this.state.hintsUsed >= charData.hints.length) {
      document.getElementById('btn-hint').disabled = true;
    }
  }

  // ── Voice ───────────────────────────────────────────────
  speakCharacter() {
    const charData = this.state.characters[this.state.currentCharIndex];
    if (!charData || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(charData.char);
    utter.lang = 'zh-HK';
    utter.rate = 0.8;
    utter.volume = this.sfxVolume;
    window.speechSynthesis.speak(utter);
  }

  // ── Audio System ────────────────────────────────────────
  initAudio() {
    // Audio will be initialized on first user interaction
    const startAudio = () => {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.startBGM();
      }
      document.removeEventListener('click', startAudio);
    };
    document.addEventListener('click', startAudio);
  }

  startBGM() {
    if (!this.audioCtx) return;
    if (this.bgmNodes) this.stopBGM();

    // Create ambient dojo BGM using oscillators
    // Generates a meditative Japanese-style ambient sound
    const ctx = this.audioCtx;
    const masterGain = ctx.createGain();
    masterGain.gain.value = this.bgmVolume * 0.15;
    masterGain.connect(ctx.destination);

    const nodes = [];

    // Deep drone (base)
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 110; // A2
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.3;
    drone.connect(droneGain);
    droneGain.connect(masterGain);
    drone.start();
    nodes.push(drone);

    // Soft pad
    const pad = ctx.createOscillator();
    pad.type = 'triangle';
    pad.frequency.value = 220; // A3
    const padGain = ctx.createGain();
    padGain.gain.value = 0.1;
    pad.connect(padGain);
    padGain.connect(masterGain);
    pad.start();
    nodes.push(pad);

    // Gentle shimmer (pentatonic)
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = 330; // E4
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.05;
    shimmer.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    shimmer.start();
    nodes.push(shimmer);

    // Animate shimmer frequency for gentle movement (pentatonic: A, C, D, E, G)
    const pentatonic = [220, 261.63, 293.66, 329.63, 392];
    let noteIdx = 0;
    this.bgmInterval = setInterval(() => {
      if (shimmer.frequency) {
        noteIdx = (noteIdx + 1) % pentatonic.length;
        shimmer.frequency.linearRampToValueAtTime(
          pentatonic[noteIdx],
          ctx.currentTime + 2
        );
      }
    }, 4000);

    // LFO for subtle volume modulation
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);
    lfo.start();
    nodes.push(lfo);

    this.bgmNodes = { nodes, masterGain };
  }

  stopBGM() {
    if (this.bgmInterval) clearInterval(this.bgmInterval);
    if (this.bgmNodes) {
      this.bgmNodes.nodes.forEach(n => { try { n.stop(); } catch(e) {} });
      this.bgmNodes = null;
    }
  }

  setBgmVolume(val) {
    this.bgmVolume = val / 100;
    document.getElementById('bgm-volume-label').textContent = val + '%';
    if (this.bgmNodes && this.bgmNodes.masterGain) {
      this.bgmNodes.masterGain.gain.value = this.bgmVolume * 0.15;
    }
  }

  setSfxVolume(val) {
    this.sfxVolume = val / 100;
    document.getElementById('sfx-volume-label').textContent = val + '%';
  }

  playSFX(type) {
    if (!this.audioCtx || this.sfxVolume === 0) return;
    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = this.sfxVolume * 0.3;

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'wrong') {
      osc.type = 'square';
      osc.frequency.value = 200;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else if (type === 'hint') {
      osc.type = 'triangle';
      osc.frequency.value = 523.25;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  }

  // ── UI Updates ──────────────────────────────────────────
  updateGameUI() {
    const chars = this.state.characters;
    const idx = this.state.currentCharIndex;
    const total = chars.length;
    const data = CHARACTER_DB[this.state.currentLevel];

    document.getElementById('game-level-badge').textContent = data.name;
    document.getElementById('char-counter').textContent = (idx + 1) + ' / ' + total;
    document.getElementById('game-score').textContent = this.state.score;

    const pct = ((idx) / total) * 100;
    document.getElementById('game-progress-bar').style.width = pct + '%';
  }

  showStrokeFeedback(text, isCorrect) {
    const el = document.getElementById('stroke-feedback');
    el.textContent = text;
    el.className = 'stroke-feedback ' + (isCorrect ? 'show-correct' : 'show-wrong');
    setTimeout(() => { el.className = 'stroke-feedback'; }, 600);
  }

  // ── Settings & Toggles ─────────────────────────────────
  toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.style.display = modal.style.display === 'none' ? 'flex' : 'none';
  }

  toggleAutoDemo(enabled) {
    this.state.showStrokeDemo = enabled;
  }

  toggleOutline(enabled) {
    this.state.showOutline = enabled;
  }

  toggleVoice(enabled) {
    this.voiceEnabled = enabled;
  }

  confirmQuit() {
    document.getElementById('quit-modal').style.display = 'flex';
  }

  closeQuitModal() {
    document.getElementById('quit-modal').style.display = 'none';
  }

  quitLevel() {
    document.getElementById('quit-modal').style.display = 'none';
    this.cleanupWriters();
    this.showScreen('level-select');
  }

  quitToLobby() {
    document.getElementById('quit-modal').style.display = 'none';
    this.cleanupWriters();
    this.showScreen('title-screen');
  }

  toggleLang() {
    this.lang = this.lang === 'zh' ? 'en' : 'zh';
    this.applyI18n();
  }

  applyI18n() {
    const dict = GAME_I18N[this.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
    const langBtn = document.getElementById('btn-lang');
    if (langBtn) langBtn.title = this.lang === 'zh' ? '語言 / Language' : 'Language / 語言';
  }

  cleanupWriters() {
    if (this.demoWriter) {
      document.getElementById('hanzi-demo').innerHTML = '';
      this.demoWriter = null;
    }
    if (this.quizWriter) {
      document.getElementById('hanzi-quiz').innerHTML = '';
      this.quizWriter = null;
    }
  }

  // ── Rules Screen ────────────────────────────────────────
  populateRules() {
    const listEl = document.getElementById('rules-list');
    STROKE_RULES.forEach((rule, i) => {
      const item = document.createElement('div');
      item.className = 'rule-item';
      item.innerHTML =
        '<span class="rule-number">' + (i + 1) + '</span>' +
        '<div class="rule-text"><strong>' + rule.rule + '</strong><span>' + rule.ruleEn + '</span></div>' +
        '<span class="rule-example">' + rule.example + '</span>';
      listEl.appendChild(item);
    });

    const gridEl = document.getElementById('stroke-grid');
    Object.entries(STROKE_TYPES).forEach(([key, val]) => {
      const item = document.createElement('div');
      item.className = 'stroke-item';
      item.innerHTML =
        '<div class="stroke-zh">' + val.zh + '</div>' +
        '<div class="stroke-en">' + val.en + ' (' + key + ')</div>';
      gridEl.appendChild(item);
    });
  }
}

// ── Initialize Game ─────────────────────────────────────
const game = new ShodoDojo();
