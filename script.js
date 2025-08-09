// Cartrauma™ Interactive Features
// All the hilarious functionality for our cart therapy center

class Cartrauma {
    constructor() {
        this.selectedProblem = null;
        this.emotionalLevel = 15;
        this.chatHistory = [];
        this.init();
    }

    init() {
        this.initProblemSelector();
        this.initTherapyChat();
        this.initSnakeDetector();
        this.initEmotionalStatus();
        this.initHoroscope();
        this.initCertificate();
        this.updateMascotMood();
    }

    // Problem Selector Functionality
    initProblemSelector() {
        const problemButtons = document.querySelectorAll('.problem-btn');
        problemButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove previous selection
                problemButtons.forEach(btn => btn.classList.remove('selected'));
                // Add selection to clicked button
                button.classList.add('selected');
                this.selectedProblem = button.dataset.problem;
                this.updateMascotMood();
                
                // Update certificate preview with selected trauma type
                this.updateCertificatePreview();
                
                // Add a contextual therapy message
                this.addTherapyMessage(`The Cartologist adjusts his tiny spectacles and scribbles notes on his clipboard...`, 'therapist');
            });
        });
    }

    // Therapy Chat System
    initTherapyChat() {
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');

        const handleSendMessage = () => {
            const message = chatInput.value.trim();
            if (message) {
                this.addTherapyMessage(message, 'user');
                chatInput.value = '';
                
                // Generate therapy response
                setTimeout(() => {
                    const response = this.generateTherapyResponse(message);
                    this.addTherapyMessage(response, 'therapist');
                    this.emotionalLevel = Math.min(100, this.emotionalLevel + 5);
                    this.updateEmotionalProgress();
                }, 1500);
            }
        };

        sendButton.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }

    addTherapyMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateTherapyResponse(userMessage) {
        const responses = {
            abandoned: [
                "Ahh, classic monsoon abandonment syndrome! I've seen this in 47% of village carts. You know what I prescribe? Puddle exposure therapy! Start with tiny puddles and work your way up to proper potholes. Think of it as 'Splash Therapy'!",
                "My dear cart, being left in the rain is like being marinated in life experience! You're not abandoned, you're just... vintage-seasoned! Those bullocks will come back when they realize GPS doesn't work in the village anyway.",
                "Monsoon trauma, eh? Let me tell you about my patient 'Squeaky Pete' - he was so afraid of water, he wouldn't even cross a banana peel! Now he's the village's premier puddle-jumper. There's hope for you yet!",
                "Listen, getting stuck in mud is basically a spa treatment for carts! Think of it as an all-natural exfoliating experience. Those shiny city cars PAY for mud baths! You got it for free!"
            ],
            heartbreak: [
                "Oh my wheels! You transported someone to their ex's wedding? That's like being a getaway car for your own heart's bank robbery! But here's the thing - you completed the job with DIGNITY. That's professional-level emotional strength!",
                "Cart heartbreak is real, and you're not alone! I once treated a rickshaw who fell in love with a Ferrari. Tragic mismatch, but the heart wants what it wants! Your job was transport, not relationship counseling - you did your part perfectly!",
                "You know what this makes you? The most romantic cart in the village! You literally carried love to its destination, even when it hurt. That's like being Cupid, but with wheels and emotional damage!",
                "Think of it this way - you're now qualified to be a 'Love Transport Specialist'! Put that on your resume! Most carts only carry vegetables and gossiping aunties. You've carried DRAMA!"
            ],
            overloaded: [
                "50 sacks when you can handle 20? That's not overloading, that's humans trying to use you as a portal to another dimension! Your back axle probably filed a complaint with the Cart Labor Union by now!",
                "Being overloaded is like being asked to carry the weight of everyone's expectations PLUS their groceries! You know what you need? A 'Maximum Load' sign and a weighing scale. Start charging by the kilogram!",
                "My friend, you're not a pack mule, you're a sophisticated transportation vehicle! Next time someone overloads you, just tell them: 'I'm a cart, not a magic bag from Doraemon!'",
                "Overloading is emotional abuse disguised as efficiency! You need to practice saying 'NO' in different languages. Try: 'Illa' (Tamil), 'Nahi' (Hindi), 'Nope' (English), and my personal favorite: 'Wheels don't work that way, Einstein!'"
            ],
            lost: [
                "Village politics! Even I get lost there, and I have a PhD in Cart Psychology! Getting lost at the panchayat office is basically a rite of passage. You've officially been initiated into the 'Confused by Democracy' club!",
                "You know what? Getting lost in village politics actually makes you MORE qualified to navigate life! If you can handle panchayat office chaos, you can handle anything. That's advanced-level confusion management!",
                "Politics is just organized confusion with extra paperwork! The fact that you found your way to therapy shows you're smarter than most politicians. At least YOU know when you need help!",
                "Being lost in politics is normal - even Google Maps gives up and shows 'Location: Somewhere in India' when you're near a panchayat office! You're not lost, you're just politically educated now!"
            ],
            bullocks: [
                "Bullock commitment issues! This is more common than you think. They're probably going through their 'grass is greener on the other side' phase. Have you tried couples counseling? I know a good buffalo therapist!",
                "Your bullocks looking at other carts is like humans looking at Instagram - it's just window shopping! They always come back to you because you're familiar, comfortable, and you know exactly how much weight they can pull!",
                "Bullock infidelity is serious business! But remember, they chose YOU for the long haul. Those fancy carts they're eyeing? Probably high-maintenance with expensive spare parts. You're the reliable Toyota of the cart world!",
                "Maybe your bullocks need a hobby! Have you considered enrolling them in bullock aerobics? Or perhaps a nice meditation class? 'Moo-ditation' is very popular these days!"
            ],
            identity: [
                "WOW! Existential cart crisis! This is the ADVANCED level of cart psychology! You're not just asking 'What am I carrying?' but 'WHO am I carrying it for?' That's philosophical PhD-level thinking right there!",
                "My dear cart, having an identity crisis means you're EVOLVING! Most carts just roll around mindlessly. You're questioning the very nature of cart-ness itself! That's like... Descartes with wheels: 'I roll, therefore I am!'",
                "You know what? Every great cart in history went through this phase! Even the legendary Carts of Mahabharata had moments where they wondered: 'Am I just wood and wheels, or am I a cosmic transport device?' Spoiler alert: You're BOTH!",
                "Listen, the fact that you're having philosophical doubts about your purpose means you've transcended basic cart consciousness! You're becoming a 'Meta-Cart' - aware of your own cart-ness. This is spiritual awakening on wheels!",
                "I'm prescribing you some 'Cart Meditation' - spend 10 minutes daily contemplating the beautiful simplicity of rolling forward. Remember: Even if you're 'just' a cart, you're the cart that chose to seek meaning. That makes you extraordinary!"
            ],
            general: [
                "That's a fascinating case study! I'm definitely including this in my upcoming book: 'Fifty Shades of Hay: A Cart's Guide to Emotional Wellness.' Your story could help thousands of carts worldwide!",
                "You know, in my 20 years of cart therapy (yes, I'm that old), I've learned that every cart has a unique emotional fingerprint. Yours happens to be... gloriously chaotic! And that's beautiful!",
                "Your emotional intelligence is off the charts! Most carts just roll around complaining about potholes. You're here seeking professional help! That's like... cart enlightenment level stuff!",
                "I'm going to prescribe you a daily dose of 'self-wheel-care.' Start each morning by polishing your wheels while affirming: 'I am strong, I am capable, and my axles are perfectly aligned!'",
                "You remind me of my favorite patient - a cart named 'Wisdom Wheeler.' She came to me broken and left as the village's most emotionally stable transport. There's definitely hope for full recovery!"
            ]
        };

        // Determine response category based on selected problem or keywords
        let category = 'general';
        if (this.selectedProblem) {
            category = this.selectedProblem;
        }

        // Check for specific keywords in user message for more personalized responses
        const lowerMessage = userMessage.toLowerCase();
        if (lowerMessage.includes('mud') || lowerMessage.includes('rain') || lowerMessage.includes('abandon') || lowerMessage.includes('stuck')) {
            category = 'abandoned';
        } else if (lowerMessage.includes('heart') || lowerMessage.includes('love') || lowerMessage.includes('ex') || lowerMessage.includes('wedding') || lowerMessage.includes('romance')) {
            category = 'heartbreak';
        } else if (lowerMessage.includes('heavy') || lowerMessage.includes('load') || lowerMessage.includes('weight') || lowerMessage.includes('sack') || lowerMessage.includes('burden')) {
            category = 'overloaded';
        } else if (lowerMessage.includes('lost') || lowerMessage.includes('direction') || lowerMessage.includes('politic') || lowerMessage.includes('confused') || lowerMessage.includes('panchayat')) {
            category = 'lost';
        } else if (lowerMessage.includes('bullock') || lowerMessage.includes('ox') || lowerMessage.includes('cow') || lowerMessage.includes('commitment') || lowerMessage.includes('relationship')) {
            category = 'bullocks';
        } else if (lowerMessage.includes('purpose') || lowerMessage.includes('meaning') || lowerMessage.includes('who am i') || lowerMessage.includes('identity') || lowerMessage.includes('soul') || lowerMessage.includes('exist')) {
            category = 'identity';
        }

        const categoryResponses = responses[category];
        return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    }

    // Snake Detector 9000
    initSnakeDetector() {
        const scanButton = document.getElementById('scanButton');
        const scanResults = document.getElementById('scanResults');
        const lights = {
            red: document.getElementById('redLight'),
            yellow: document.getElementById('yellowLight'),
            green: document.getElementById('greenLight')
        };

        scanButton.addEventListener('click', () => {
            this.performSnakeScan(scanResults, lights);
        });
    }

    performSnakeScan(resultsDiv, lights) {
        // Reset lights
        Object.values(lights).forEach(light => light.classList.remove('active'));
        
        // Start scanning sequence
        resultsDiv.innerHTML = '<p>INITIATING EMOTIONAL SNAKE SCAN...</p>';
        lights.red.classList.add('active');

        setTimeout(() => {
            resultsDiv.innerHTML = '<p>🔍 SCANNING PERIMETER...</p><p>SEARCHING FOR TOXIC VIBES...</p>';
            lights.red.classList.remove('active');
            lights.yellow.classList.add('active');
        }, 1000);

        setTimeout(() => {
            lights.yellow.classList.remove('active');
            lights.green.classList.add('active');
            
            // Generate random snake detection results
            const snakeResults = this.generateSnakeResults();
            resultsDiv.innerHTML = snakeResults;
            
            // Boost emotional level slightly
            this.emotionalLevel = Math.min(100, this.emotionalLevel + 3);
            this.updateEmotionalProgress();
        }, 2500);

        setTimeout(() => {
            lights.green.classList.remove('active');
        }, 4000);
    }

    generateSnakeResults() {
        const snakeFindings = [
            {
                title: "🐍 TOXIC EXPECTATION SNAKE DETECTED!",
                description: "Location: 45 meters northeast<br>Threat Level: MEDIUM<br>Recommendation: Practice saying 'NO' loudly",
                solution: "Counter-venom: Self-respect meditation"
            },
            {
                title: "🐍 COMPARISON COBRA SPOTTED!",
                description: "Location: Social media vicinity<br>Threat Level: HIGH<br>Behavior: Whispering 'other carts are faster'",
                solution: "Counter-venom: Remember your unique journey"
            },
            {
                title: "🐍 GUILT PYTHON CIRCLING!",
                description: "Location: Past decisions department<br>Threat Level: LOW<br>Strategy: Slow emotional strangulation",
                solution: "Counter-venom: Forgiveness therapy"
            },
            {
                title: "✅ ALL CLEAR - NO SNAKES DETECTED!",
                description: "Emotional perimeter: SECURE<br>Vibe check: POSITIVE<br>Cart status: PROTECTED",
                solution: "Maintenance: Continue current therapy routine"
            },
            {
                title: "🐍 PROCRASTINATION SERPENT HIDING!",
                description: "Location: Tomorrow's plans<br>Threat Level: SNEAKY<br>Tactics: Delaying emotional progress",
                solution: "Counter-venom: Take action TODAY!"
            },
            {
                title: "🐍 PERFECTIONIST VIPER ALERT!",
                description: "Location: Goal-setting center<br>Threat Level: PARALYZING<br>Method: Unrealistic standards injection",
                solution: "Counter-venom: 'Good enough' mantra"
            }
        ];

        const result = snakeFindings[Math.floor(Math.random() * snakeFindings.length)];
        return `
            <div style="text-align: left; line-height: 1.4;">
                <strong>${result.title}</strong><br>
                <div style="margin: 8px 0; font-size: 0.9em;">
                    ${result.description}
                </div>
                <div style="color: #FFD700; font-weight: bold;">
                    ${result.solution}
                </div>
            </div>
        `;
    }

    // Emotional Status Bar
    initEmotionalStatus() {
        const boostButtons = document.querySelectorAll('.boost-btn');
        boostButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleBoostClick(button.dataset.boost);
            });
        });
    }

    handleBoostClick(boostType) {
        const quotes = {
            confidence: [
                "🌟 'Confidence is not \"they will like me\", confidence is \"I'll be fine if they don't\"' - Cart Gandhi",
                "🌟 You are not just any cart, you are THE cart! Your wheels have stories that inspire!",
                "🌟 Every successful journey started with a single wheel rotation. You've got this!",
                "🌟 'Aathmavishwasam ullavar lokam jeikkum' (Those with self-confidence will conquer the world)!"
            ],
            strength: [
                "💪 Your axles are stronger than you think! You've carried burdens that would break other carts!",
                "💪 'Balam ullavark balaheenar illa' (Those with strength have no weakness) - Ancient Cart Wisdom",
                "💪 Remember, you're made of solid wood and determination. That's an unbeatable combination!",
                "💪 Every pothole you've survived has made your suspension stronger. You're practically indestructible!"
            ],
            peace: [
                "🕊️ Inner peace comes from accepting that some roads are bumpy, but your destination remains beautiful.",
                "🕊️ 'Shamalam aanu shakti' (Peace is power) - Let tranquility be your superpower.",
                "🕊️ Like a calm bullock, steady and sure, your peaceful pace wins the race.",
                "🕊️ Breathe in courage, breathe out worry. Your chassis is relaxed, your mind is clear."
            ],
            malayali: [
                "🥥 'Njan undakum, ningal undakum, nammal ellam undakum!' (I will be fine, you will be fine, we all will be fine!)",
                "🥥 'Kazhinju poyi ennu karuthalle, thodangi ennu karuthuka' (Don't think it's over, think it's beginning)",
                "🥥 'Ellam sheriyakum' (Everything will be alright) - The ultimate Malayalam healing mantra!",
                "🥥 'Valya sambhavam onnum illa' (It's not a big deal) - Sometimes the best therapy is perspective!",
                "🥥 'Time und, patience und, ellam nadakkum' (There's time, there's patience, everything will happen)"
            ]
        };

        const selectedQuotes = quotes[boostType];
        const randomQuote = selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)];
        
        // Update motivation quotes
        document.getElementById('motivationQuotes').innerHTML = `<p>${randomQuote}</p>`;
        
        // Boost emotional level
        const boostAmount = Math.floor(Math.random() * 15) + 10; // 10-25 boost
        this.emotionalLevel = Math.min(100, this.emotionalLevel + boostAmount);
        this.updateEmotionalProgress();
        
        // Update mascot mood
        this.updateMascotMood();
    }

    updateEmotionalProgress() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${this.emotionalLevel}%`;
        
        let statusText = '';
        if (this.emotionalLevel < 20) {
            statusText = `${this.emotionalLevel}% - Slightly Wobbly`;
        } else if (this.emotionalLevel < 40) {
            statusText = `${this.emotionalLevel}% - Getting Steadier`;
        } else if (this.emotionalLevel < 60) {
            statusText = `${this.emotionalLevel}% - Rolling Smoothly`;
        } else if (this.emotionalLevel < 80) {
            statusText = `${this.emotionalLevel}% - Confidently Cruising`;
        } else if (this.emotionalLevel < 95) {
            statusText = `${this.emotionalLevel}% - Emotionally Excellent`;
        } else {
            statusText = `${this.emotionalLevel}% - Cart Nirvana Achieved!`;
        }
        
        progressText.textContent = statusText;
        
        // Update certificate preview with current healing level
        this.updateCertificatePreview();
    }

    // Horoscope Generator
    initHoroscope() {
        const generateButton = document.getElementById('generateHoroscope');
        generateButton.addEventListener('click', () => {
            this.generateHoroscope();
        });
    }

    generateHoroscope() {
        const horoscopeDisplay = document.getElementById('horoscopeDisplay');
        
        // Show generating animation
        horoscopeDisplay.innerHTML = '<p>🔮 Consulting the cosmic carts...</p>';
        
        setTimeout(() => {
            const horoscope = this.createHoroscope();
            horoscopeDisplay.innerHTML = horoscope;
            
            // Slight emotional boost from cosmic guidance
            this.emotionalLevel = Math.min(100, this.emotionalLevel + 2);
            this.updateEmotionalProgress();
        }, 2000);
    }

    createHoroscope() {
        const horoscopes = [
            {
                title: "🌟 The Wheels of Fortune Smile Upon You!",
                prediction: "Today, your emotional axles are perfectly aligned with the universe. A stranger will compliment your wheel design, and you'll receive unexpected cargo that brings joy. Lucky direction: Northeast. Avoid: Muddy shortcuts.",
                malayali: "പാഴ്‌മൻ: 'Pudiya vazhi, pudiya sammanam' (New path, new respect)"
            },
            {
                title: "🌙 Lunar Cart Energy is Strong",
                prediction: "The moon's gravitational pull affects your suspension today. You may feel emotionally bouncy, but this is good! Romance enters through your cargo compartment. A bullock will wink at you meaningfully.",
                malayali: "പാഴ്‌മൻ: 'Chandrane pole sundaran, cartine pole balavan' (Beautiful like the moon, strong like a cart)"
            },
            {
                title: "☀️ Solar Cart Power Activated!",
                prediction: "Your wooden body absorbs positive solar energy today. Expect three compliments about your craftsmanship and one person asking for your phone number (for cart services, obviously). Wear your best decorations.",
                malayali: "പാഴ്‌മൻ: 'Suriyan pole prakashikan, jeevitham pole sundharam' (Shine like the sun, beautiful like life)"
            },
            {
                title: "🌪️ Cosmic Winds of Change",
                prediction: "Change is coming faster than a Kerala Express train! Your emotional cargo will be reorganized by the universe. An old road will lead to new opportunities. Trust your inner compass.",
                malayali: "പാഴ്‌മൻ: 'Marunna kaalam, marunnilla dairyam' (Times change, but courage doesn't)"
            },
            {
                title: "🌈 Rainbow After the Storm",
                prediction: "Yesterday's puddles become today's mirrors reflecting your beauty! Your resilience impresses even the village elders. A lost item will return with a funny story attached.",
                malayali: "പാഴ്‌മൻ: 'Kashtam kazhinju, sukham thudangunnu' (Hardship ends, happiness begins)"
            },
            {
                title: "⚡ Lightning Speed Luck",
                prediction: "Your karma account is overflowing with good points! Today you'll finish three journeys in the time of two. Someone will offer you premium hay, and your wheel squeaks will mysteriously disappear.",
                malayali: "പാഴ്‌മൻ: 'Vegam ullavark, vijayam ullu' (Speed brings victory)"
            }
        ];

        const randomHoroscope = horoscopes[Math.floor(Math.random() * horoscopes.length)];
        
        return `
            <div style="text-align: center;">
                <h4 style="color: #9C27B0; margin-bottom: 10px;">${randomHoroscope.title}</h4>
                <p style="margin-bottom: 15px; line-height: 1.5;">${randomHoroscope.prediction}</p>
                <div style="background: rgba(156, 39, 176, 0.1); padding: 10px; border-radius: 8px; font-style: italic;">
                    <strong>${randomHoroscope.malayali}</strong>
                </div>
            </div>
        `;
    }

    // Certificate System
    initCertificate() {
        const downloadButton = document.getElementById('downloadCert');
        const cartNameInput = document.getElementById('cartNameInput');
        
        cartNameInput.addEventListener('input', (e) => {
            const certName = document.getElementById('certName');
            const certNameMalayalam = document.getElementById('certNameMalayalam');
            const cartName = e.target.value || '[Your Cart Name]';
            
            certName.textContent = cartName;
            // Generate a fun Malayalam version
            if (cartName !== '[Your Cart Name]') {
                certNameMalayalam.textContent = `${cartName} കാർട്ട്`;
            } else {
                certNameMalayalam.textContent = '[Malayalam Cart Name]';
            }
        });

        // Update healing level and trauma type based on current state
        this.updateCertificatePreview();

        downloadButton.addEventListener('click', () => {
            this.downloadCertificate();
        });
    }

    updateCertificatePreview() {
        const healingLevelSpan = document.getElementById('healingLevel');
        const traumaTypeSpan = document.getElementById('traumaType');
        
        if (healingLevelSpan) {
            healingLevelSpan.textContent = `${this.emotionalLevel}%`;
        }
        
        if (traumaTypeSpan && this.selectedProblem) {
            const traumaNames = {
                abandoned: 'Monsoon Abandonment Syndrome',
                heartbreak: 'Romantic Transportation Trauma',
                overloaded: 'Excessive Burden Disorder',
                lost: 'Political Navigation Confusion',
                bullocks: 'Bovine Relationship Issues',
                identity: 'Existential Cart Crisis'
            };
            traumaTypeSpan.textContent = `"${traumaNames[this.selectedProblem]}"`;
        }
    }

    downloadCertificate() {
        const cartName = document.getElementById('cartNameInput').value.trim() || 'Anonymous Cart';
        
        // Create certificate content
        const certificateHTML = this.generateCertificateHTML(cartName);
        
        // Create blob and download
        const blob = new Blob([certificateHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Cartrauma_Master_Degree_${cartName.replace(/\s+/g, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        alert(`🎉 Master Degree Certificate downloaded for ${cartName}! You are now officially qualified to carry life's burdens with dignity and humor!`);
    }

    generateCertificateHTML(cartName) {
        const currentDate = new Date().toLocaleDateString();
        const malayalamCartName = `${cartName} കാർട്ട്`;
        const traumaType = this.selectedProblem ? 
            {
                abandoned: 'Monsoon Abandonment Syndrome',
                heartbreak: 'Romantic Transportation Trauma',
                overloaded: 'Excessive Burden Disorder',
                lost: 'Political Navigation Confusion',
                bullocks: 'Bovine Relationship Issues',
                identity: 'Existential Cart Crisis'
            }[this.selectedProblem] : 'General Life Struggles';
            
        return `
<!DOCTYPE html>
<html>
<head>
    <title>Cartrauma™ Master Degree Certificate</title>
    <meta charset="UTF-8">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Malayalam:wght@400;700&display=swap');
        body { 
            font-family: 'Arial', serif; 
            padding: 40px; 
            background: linear-gradient(45deg, #FFF8E1, #F9F4E1);
            text-align: center;
            line-height: 1.6;
        }
        .certificate {
            max-width: 900px;
            margin: 0 auto;
            border: 8px solid #FF9800;
            padding: 40px;
            background: white;
            box-shadow: 0 0 30px rgba(0,0,0,0.2);
            border-radius: 15px;
        }
        .header { 
            color: #E65100; 
            font-size: 28px; 
            font-weight: bold; 
            margin-bottom: 10px; 
        }
        .subtitle { 
            color: #FF8F00; 
            font-size: 16px; 
            margin-bottom: 20px; 
            font-weight: bold;
        }
        .degree-title {
            color: #D84315;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
        .malayalam-text {
            font-family: 'Noto Sans Malayalam', 'Arial Unicode MS', sans-serif;
            color: #8D6E63;
            font-style: italic;
            margin: 5px 0 20px 0;
        }
        .awarded-to {
            font-size: 18px;
            font-weight: bold;
            margin: 30px 0 10px 0;
        }
        .recipient { 
            font-size: 32px; 
            color: #D84315; 
            margin: 20px 0; 
            font-weight: bold; 
            background: rgba(255,193,7,0.3);
            padding: 10px;
            border-radius: 10px;
        }
        .recipient-malayalam {
            font-family: 'Noto Sans Malayalam', 'Arial Unicode MS', sans-serif;
            font-size: 18px;
            color: #8D6E63;
            font-style: italic;
            margin: 10px 0 30px 0;
        }
        .content { 
            font-size: 16px; 
            line-height: 1.8; 
            margin: 30px 0; 
        }
        .grade-section {
            background: linear-gradient(45deg, #FFE082, #FFF176);
            border: 3px solid #FFA000;
            border-radius: 10px;
            padding: 15px;
            margin: 30px 0;
            font-size: 20px;
            font-weight: bold;
        }
        .permissions { 
            text-align: left; 
            margin: 30px auto; 
            max-width: 500px; 
        }
        .permissions div {
            margin: 10px 0;
            font-weight: bold;
            color: #2E7D32;
        }
        .signature { 
            margin-top: 40px; 
            font-size: 16px; 
            color: #666; 
        }
        .signature .malayalam {
            font-family: 'Noto Sans Malayalam', 'Arial Unicode MS', sans-serif;
            font-size: 14px;
            color: #8D6E63;
            font-style: italic;
        }
        .date { 
            position: absolute; 
            top: 20px; 
            right: 20px; 
            font-size: 14px; 
        }
        .date-malayalam {
            font-family: 'Noto Sans Malayalam', 'Arial Unicode MS', sans-serif;
            font-size: 12px;
        }
        .cart-icon { 
            font-size: 48px; 
            margin: 20px 0; 
        }
        .footer-message {
            background: linear-gradient(45deg, #E8F5E8, #C8E6C9);
            border: 3px solid #4CAF50;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
        }
        .footer-malayalam {
            font-family: 'Noto Sans Malayalam', 'Arial Unicode MS', sans-serif;
            font-size: 14px;
            line-height: 1.8;
            color: #2E7D32;
            margin-top: 15px;
        }
        .healing-level {
            color: #4CAF50;
            font-weight: bold;
        }
        .trauma-type {
            color: #E91E63;
            font-weight: bold;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="date">Date: ${currentDate}<br><span class="date-malayalam">തീയതി: ${currentDate}</span></div>
        
        <div class="header">🏆 CARTRAUMA™ INSTITUTE</div>
        <div class="subtitle">Official Center for Cart Emotional Rehabilitation</div>
        
        <div class="degree-title">MASTER DEGREE IN EMOTIONAL RESILIENCE</div>
        <div class="malayalam-text">മാനസിക പ്രതിരോധ ശേഷിയിൽ ബിരുദം</div>
        
        <div class="cart-icon">🛺</div>
        
        <div class="awarded-to"><strong>Awarded to:</strong></div>
        <div class="recipient">${cartName.toUpperCase()}</div>
        <div class="recipient-malayalam">${malayalamCartName}</div>
        
        <div class="content">
            <p>For successfully completing emotional rehabilitation therapy and achieving a healing level of <span class="healing-level">${this.emotionalLevel}%</span> while bravely confronting the trauma of: <span class="trauma-type">"${traumaType}"</span></p>
        </div>
        
        <div class="grade-section">
            Grade: SUMMA CUM LAUDE 🌟
        </div>
        
        <div class="permissions">
            <div>✅ Carry emotional burdens responsibly</div>
            <div>✅ Navigate village roads with confidence</div>
            <div>✅ Resist snake-induced trauma</div>
            <div>✅ Maintain healthy bullock relationships</div>
            <div>✅ Practice self-care and boundary setting</div>
            <div>✅ Seek help when emotionally overloaded</div>
        </div>
        
        <div class="signature">
            <p><strong>The Cartologist</strong><br>
            Chief Cart Psychologist & Chief Wheel Whisperer<br>
            <span class="malayalam">കാർട്ട് മനോചികിത്സകൻ</span><br>
            <em>Authorized by Cartrauma™ Institute</em></p>
        </div>
        
        <div class="footer-message">
            <p><strong>🎊 Congratulations! This certificate proves you are now emotionally qualified to carry life's burdens with dignity and humor! 🎊</strong></p>
            <div class="footer-malayalam">
                അഭിനന്ദനങ്ങൾ! ഈ സർട്ടിഫിക്കറ്റ് തെളിയിക്കുന്നത് നിങ്ങൾ ഇപ്പോൾ ജീവിതത്തിന്റെ ഭാരങ്ങൾ മാന്യതയോടും നർമ്മത്തോടും കൂടി വഹിക്കാൻ മാനസികമായി യോഗ്യരാണെന്ന്!
            </div>
        </div>
        
        <div style="margin-top: 30px; font-size: 12px; color: #999; font-style: italic;">
            This certificate is purely comedic and should be displayed with pride and humor.<br>
            ഈ സർട്ടിഫിക്കറ്റ് പൂർണ്ണമായും ഹാസ്യാത്മകമാണ്, അഭിമാനത്തോടും നർമ്മത്തോടും കൂടി പ്രദർശിപ്പിക്കണം.
        </div>
    </div>
</body>
</html>`;
    }

    // Mascot Mood Updates
    updateMascotMood() {
        const mascotMouth = document.querySelector('.mascot-cart .mouth');
        
        if (this.emotionalLevel < 30) {
            mascotMouth.textContent = '😢';
        } else if (this.emotionalLevel < 50) {
            mascotMouth.textContent = '😐';
        } else if (this.emotionalLevel < 70) {
            mascotMouth.textContent = '🙂';
        } else if (this.emotionalLevel < 90) {
            mascotMouth.textContent = '😊';
        } else {
            mascotMouth.textContent = '😄';
        }
    }
}

// Initialize the Cartrauma application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Cartrauma();
    
    // Add some easter eggs
    console.log('🛺 Welcome to Cartrauma™! Your cart\'s emotional well-being is our priority!');
    console.log('💡 Try typing some of these keywords in therapy: "bullock", "mud", "heavy", "lost", "heart"');
    
    // Fun little interaction - clicking the logo
    const cartLogo = document.querySelector('.cart-logo');
    if (cartLogo) {
        cartLogo.addEventListener('click', () => {
            cartLogo.style.animation = 'none';
            setTimeout(() => {
                cartLogo.style.animation = 'wiggle 3s ease-in-out infinite';
            }, 100);
            
            alert('🛺 "I may be just an emoji, but I have feelings too!" - Cart Logo');
        });
    }
});
