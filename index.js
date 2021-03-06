const puppeteer = require('puppeteer');
require('dotenv/config');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setDefaultNavigationTimeout(0);
    
    //LOGIN
    await page.goto('https://store.steampowered.com/login/?redir=&redir_ssl=1&snr=1_4_4__global-header'); //login page
    await page.waitForSelector('#input_username'); //input username
    await page.type('#input_username', process.env.TYPE_USERNAME); //username
    await page.waitForSelector('#input_password'); //input password
    await page.type('#input_password', process.env.TYPE_PASSWORD); //password
    await page.click('#login_btn_signin > button'); //click button login
    await page.waitForTimeout(15000); //wait for 15s to insert code two pass DELETE THIS IF YOU DONT USE STEAM GUARD.

    //SEARCH
    await page.goto('https://store.steampowered.com/search/'); //search page
    await page.waitForSelector('#term'); //search input
    await page.type('#term', 'warframe'); //type game name
    await page.click('#advsearchform > div.page_content_ctn > div > div.leftcol.large > div.searchbar > div.searchbar_left > button');//click button to search
    await page.waitForTimeout(1000); //wait for 1s to load list game
    await page.waitForSelector('#search_resultsRows > a:nth-child(1)');//first result
    await page.click('#search_resultsRows > a:nth-child(1)'); //click first result
    await page.waitForTimeout(2000); //wait for 2s to load game page
    if (await page.$('#ageYear') !== null){ //if exist "year table"
        await page.select('#ageYear', '1969'); //set select if year to 1969
        await page.click('#app_agegate > div.main_content_ctn > div.agegate_text_container.btns > a:nth-child(1)'); //click button "go home"
    }
    await page.waitForSelector('#game_area_purchase > div.game_area_purchase_game > div.game_purchase_action > div > div.btn_addtocart > a'); //button "game"
    await page.click('#game_area_purchase > div.game_area_purchase_game > div.game_purchase_action > div > div.btn_addtocart > a'); //click button game
    await page.waitForSelector('body > div.gotsteamModal > div > div > div.gotsteam_buttons > a.gotSteam_SteamURL.btn_blue.leftbtn'); //button "ja tenho steam"
    await page.click('body > div.gotsteamModal > div > div > div.gotsteam_buttons > a.gotSteam_SteamURL.btn_blue.leftbtn'); //click button "ja tenho steam"

    await page.waitForTimeout(5000); //wait for 5s for you click in "permitir abrir link na steam"

    let games = ['War of Omens',' DISSIDIA FINAL FANTASY NT Free Edition',' Shot Online',' LuckCatchers',' LET IT DIE',' Prime World: Defenders 2',' Deliverace - Battle Racing',' Dreadnought',' God Awe-full Clicker',' World of Warplanes',' Sky Clash: Lords of Clans 3D',' War Robots',' Runes of Magic',' Warmonger',' MU Legend',' Idle Dungeons',' Fighting Fantasy Classics',' Wild West Saga',' Idle Champions of the Forgotten Realms',' Idle Heist',' My Free Farm 2',' Hero Zero',' Rocket Valley Tycoon',' GetMeBro!',' Friday the 13th: Killer Puzzle',' BallisticNG',' Wuxing Master',' Conflict of Nations: World War 3',' Marble Run 2D',' Florensia',' SoulWorker',' Harvest Seasons',' Tale of Toast',' Trailer Park Boys: Greasy Money',' Ball 3D',' Hand of the Gods',' Dead Maze',' Granado Espada',' Time Gap',' Black Squad',' Holyday City: Reloaded',' My Free Zoo',' Space Wars: Interstellar Empires',' Twilight Town',' Armored Warfare',' Yu-Gi-Oh! Duel Links',' Closers',' Tank Force',' Warspear Online',' Grace of Zordan',' Relik',' Call of War',' Office Space: Idle Profits',' Luna Online: Reborn',' Oldage',' Dragon Glory',' Castle Clicker',' Puzzle Pirates: Dark Seas',' Kritika:REBOOT',' Duel of Summoners : The Mabinogi Game',' Tree of Savior',' GUNS UP!',' Sniper Fury',' NosTale',' Poker World',' Brawl of Ages',' Twin Saga',' Heavy Metal Machines',' Orcs Must Die! Unchained',' Super POTUS Trump',' A Step Into Darkness',' Gigantic',' Ragnarok Re:Start',' Art of War: Red Tides',' Trophy Fishing 2',' Star Trek Timelines',' Skull Ball Heroes',' Son Korsan',' Knightfall???: Rivals',' Ironbound',' Pixel Worlds',' The Elder Scrolls: Legends',' Learn to Fly 3',' Mystic Journey: Tri Peaks Solitaire',' Warfare Online',' Animation Throwdown: The Quest for Cards',' Metin2',' Ways of History',' Storm Riders',' Business Tour - Online Multiplayer Board Game',' Age of Heroes: Conquest',' Atom Fishing II',' KROSMAGA',' Elsewhere High: Chapter 1 - A Visual Novel',' The Fishing Club 3D',' Neverwinter',' Heroes of Dire',' Warface Turkey',' Tap Adventure: Time Travel',' UFO Online: Invasion',' Toribash',' Midas Gold Plus',' Echoes of the Fey Episode 0: The Immolation',' Soda Dungeon',' Nick',' Bloody Walls',' Say Goodbye',' HoCWar',' Clicker Guild',' Operation: New Earth',' ERR - 001',' True or False',' One Tower',' Infestation: The New Z',' Zone4',' Eternal Card Game',' Sunsets Ashes',' Dofus',' Age of Cavemen',' Spellstone',' Demise of Nations',' Digimon Masters Online',' The Infinite Black',' Racecar.io',' Knight Online',' Robocraft',' Campaign Clicker',' Paladins',' Helmet Heroes',' Stash',' Shop Heroes',' Destiny of Ancient Kingdoms???',' Ember Strike',' Shonen Idle Z',' Emerland Solitaire: Endless Journey',' BLOCKADE 3D',' SpellKnights',' Red Trigger',' Riders of Icarus',' Zavix Tower',' Twisted Worlds',' Zaccaria Pinball',' Insanity Clicker',' Khimera: Destroy All Monster Girls',' Allods Online',' Chronicle: RuneScape Legends',' Crush Crush',' BattleSouls',' Crazy Killer',' Epic Clicker Journey',' Retaliation',' Spellweaver',' Emporea',' Origin Of Destiny: Crimson Awakening',' Allods Online RU',' LoveBeat',' Mystic Destinies: Serendipity of Aeons',' Elemental Heroes',' HIS (Heroes In the Sky)',' RaceRoom Racing Experience',' Americas Army: Proving Grounds',' Tap Tap Legions - Epic battles within 5 seconds!',' Emily is Away',' Lucent Heart',' RPG MO',' Dragon Saga',' Gunslingers',' Devilian',' Immortal Empire',' Might & Magic Heroes Online',' Dungeon Defenders II',' Astro Lords',' Aion',' WAKFU',' WARMODE',' Crusaders of the Lost Idols',' Frozen Free Fall: Snowball Fight',' Missing Translation',' SMITE',' One Way To Die',' Mortal Online',' Close Your Eyes',' Heroes of Scene',' Magic Duels',' Dream Of Mirror Online',' Relic Hunters Zero: Remix',' Sakura Clicker',' One Manga Day',' AdVenture Capitalist',' Card Hunter',' Max Gentlemen',' Metro Conflict',' Echo of Soul',' Anomaly Zone',' Dirty Bomb',' Skara - The Blade Remains',' Batla',' Clicker Heroes',' Rustbucket Rumble',' Warside',' Epic Arena',' The Gate',' Block N Load',' Survarium',' Nightbanes',' Infinite Crisis???',' World of Guns: Gun Disassembly',' Kingdoms CCG',' Navy Field 2 : Conqueror of the Ocean',' Requiem',' Bloodline Champions',' The Four Kings Casino and Slots',' Transformice',' BattleSpace',' Gear Up',' Heroines Quest: The Herald of Ragnarok',' Brick-Force',' Divine Souls',' Sins of a Dark Age',' Gems of Wa',' The Mighty Quest For Epic Loot',' Get Off My Lawn!',' Eldevin',' Happy Wars',' Pox Nora',' A.V.A. Alliance of Valiant Arms???',' Dead Island: Epidemic',' Stronghold Kingdoms',' Ragnarok',' Aura Kingdom',' Deadbreed??',' Warface',' 8BitMMO',' Reversion - The Escape',' Panzar',' Dogs of War Online - Beta',' Archeblade',' Villagers and Heroes',' Realm of the Mad God Exalt',' Dragons and Titans',' MapleStory',' GunZ 2: The Second Duel',' Victory: The Age of Racing',' Blacklight: Retribution',' Spiral Knights',' March of War',' AirMech Strike',' PlanetSide 2',' Dungeonland',' Might & Magic: Duel of Champions',' Pinball Arcade',' No More Room in Hell',' RIFT',' Path of Exile',' Magicka: Wizard Wars',' Tactical Intervention',' Cannon Brawl',' Marvel Heroes Omega',' Smashmuck Champions',' Gotham City Impostors: Free To Play',' Star Conflict',' AirBuccaneers',' Soldier Front 2',' War of the Roses',' Warframe',' Team Fortress 2',' Dota 2'];
    
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        console.log("Coletando:" + game);
        //SEARCH CUSTOM
        await page.goto('https://store.steampowered.com/search/'); //search page
        await page.waitForSelector('#term'); //search input
        await page.type('#term', game); //type game name
        await page.click('#advsearchform > div.page_content_ctn > div > div.leftcol.large > div.searchbar > div.searchbar_left > button');//click button to search
        await page.waitForTimeout(2000); //wait for 1s to load list game
        if (await page.$('#search_resultsRows > a:nth-child(1)') !== null){
            await page.waitForSelector('#search_resultsRows > a:nth-child(1)');//first result
            await page.click('#search_resultsRows > a:nth-child(1)'); //click first result
            await page.waitForTimeout(2000); //wait for 2s to load game page
            if (await page.$('#ageYear') !== null){ //if exist "year table"
                await page.select('#ageYear', '1969'); //set select if year to 1969
                await page.click('#app_agegate > div.main_content_ctn > div.agegate_text_container.btns > a:nth-child(1)'); //click button "go home"
            }
            if (await page.$('#game_area_purchase > div.game_area_purchase_game > div.game_purchase_action > div > div.btn_addtocart > a') !== null){ //if exist "play button"
                await page.waitForSelector('#game_area_purchase > div.game_area_purchase_game > div.game_purchase_action > div > div.btn_addtocart > a'); //button "play"
                await page.click('#game_area_purchase > div.game_area_purchase_game > div.game_purchase_action > div > div.btn_addtocart > a'); //click button play
                await page.waitForSelector('body > div.gotsteamModal > div > div > div.gotsteam_buttons > a.gotSteam_SteamURL.btn_blue.leftbtn'); //button "ja tenho steam"
                await page.click('body > div.gotsteamModal > div > div > div.gotsteam_buttons > a.gotSteam_SteamURL.btn_blue.leftbtn'); //click button "ja tenho steam"
                console.log(game + " Coletado com sucesso.");
            } else {
                console.log(game + " N??o coletado");
            }
        } else {
            console.log(game + " N??o encontrado");
        }
    }
})();