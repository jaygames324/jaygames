const games = [
  // ===== FROM YOUR UPDATED ZIP =====
  {
    id: "slope",
    title: "Slope",
    src: "https://slope-online.github.io/slope/",
    img: "game%20logos/slope.png",
    tags: ["popular", "3d", "fun", "best"]
  },
  {
    id: "2048",
    title: "2048",
    src: "https://script.google.com/macros/s/AKfycbwgo9fzGlgbzqpBKfXrw7gGGvg8cYPPL-ycgd_y9jKePSDVnk_zr_keYn8v-0eUJQd5/exec",
    img: "game%20logos/2048.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "moto-x3m",
    title: "Moto X3M",
    src: "https://moto-x3monline.github.io/file/",
    img: "game%20logos/moto-x3m.png",
    tags: ["popular", "racing", "fun"]
  },
  {
    id: "basket-random",
    title: "Basket Random",
    src: "https://ubg98.github.io/BasketRandom/",
    img: "game%20logos/basket-random.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "run-3",
    title: "Run 3",
    src: "https://dubdoo.com/games/clrun3.html",
    img: "game%20logos/run-3.png",
    tags: ["popular", "adventure", "fun"]
  },
  {
    id: "granny",
    title: "Granny",
    src: "https://gnhustgames.org/granny-source/",
    img: "game%20logos/granny.png",
    tags: ["popular", "survival", "fun"]
  },
  {
    id: "baldis-basics",
    title: "Baldi's Basics",
    src: "https://baldis-basics-online.github.io/file/",
    img: "game%20logos/baldis-basics.png",
    tags: ["popular", "fun"]
  },
  {
    id: "bitlife",
    title: "Bitlife",
    src: "https://sciencemathedu.github.io/bitlife/",
    img: "game%20logos/bitlife.png",
    tags: ["popular", "simulators", "fun", "best"]
  },
  {
    id: "papas-pizzeria",
    title: "Papa's Pizzeria",
    src: "https://papaspizzeria.io/papas-pizzeria.embed",
    img: "game%20logos/papas-pizzeria.png",
    tags: ["popular", "fun"]
  },
  {
    id: "retro-bowl",
    title: "Retro Bowl",
    src: "https://falloutscript.github.io/Retrobowl/",
    img: "game%20logos/retro-bowl.png",
    tags: ["popular", "fun", "best"]
  },
  {
    id: "monkey-mart",
    title: "Monkey Mart",
    src: "https://voidnetgames.github.io/monkeymartgame/file/",
    img: "game%20logos/monkey-mart.png",
    tags: ["popular", "simulators", "fun"]
  },
  {
    id: "crossy-road",
    title: "Crossy Road",
    src: "https://mc0825.github.io/g20/class-402/",
    img: "game%20logos/crossy-road.png",
    tags: ["popular", "fun"]
  },
  {
    id: "wordle",
    title: "Wordle",
    src: "https://bosorioo.github.io/wordle-unlimited/",
    img: "game%20logos/wordle.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "five-nights-at-epsteins",
    title: "Five Nights at Epstein's",
    src: "https://harshulmoon.github.io/fnae.html",
    img: "game%20logos/five-nights-at-epsteins.png",
    tags: ["popular", "fun", "new"]
  },
  {
    id: "geometry-dash-subzero",
    title: "Geometry Dash SubZero",
    src: "https://lolygames.github.io/gd-zubero/",
    img: "game%20logos/geometry-dash-subzero.png",
    tags: ["popular", "fun", "best"]
  },
  {
    id: "block-blast",
    title: "Block Blast",
    src: "https://www.dubdoo.com/games/blockblast.html",
    img: "game%20logos/block-blast.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "plants-vs-zombies",
    title: "Plants vs Zombies",
    src: "https://www.dubdoo.com/games/plantsvszombies.html",
    img: "game%20logos/plants-vs-zombies.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "subway-surfers",
    title: "Subway Surfers",
    src: "https://subwaygame.bitbucket.io/file/",
    img: "game%20logos/subway-surfers.png",
    tags: ["popular", "adventure", "fun", "best"]
  },
  {
    id: "btd1",
    title: "Bloons Tower Defense 1",
    src: "https://dubdoo.com/games/bloonstd1.html",
    img: "game%20logos/btd1.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "btd2",
    title: "Bloons Tower Defense 2",
    src: "https://dubdoo.com/games/bloonstd2.html",
    img: "game%20logos/btd2.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "btd3",
    title: "Bloons Tower Defense 3",
    src: "https://dubdoo.com/games/bloonstd3.html",
    img: "game%20logos/btd3.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "btd4",
    title: "Bloons Tower Defense 4",
    src: "https://dubdoo.com/games/bloonstd4.html",
    img: "game%20logos/btd4.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "btd5",
    title: "Bloons Tower Defense 5",
    src: "https://dubdoo.com/games/bloonstd5.html",
    img: "game%20logos/btd5.webp",
    tags: ["popular", "puzzle", "fun", "best"]
  },
  {
    id: "fnaf1",
    title: "Five Nights at Freddy's 1",
    src: "https://dubdoo.com/games/fnaf.html",
    img: "game%20logos/fnaf1.png",
    tags: ["popular", "survival", "fun"]
  },
  {
    id: "drive-mad",
    title: "Drive Mad",
    src: "https://dubdoo.com/games/drivemad.html",
    img: "game%20logos/drive-mad.png",
    tags: ["popular", "racing", "fun"]
  },
  {
    id: "fnaf2",
    title: "Five Nights at Freddy's 2",
    src: "https://dubdoo.com/games/fnaf2.html",
    img: "game%20logos/fnaf2.png",
    tags: ["popular", "survival", "fun"]
  },
  {
    id: "fnaf3",
    title: "Five Nights at Freddy's 3",
    src: "https://dubdoo.com/games/fnaf3.html",
    img: "game%20logos/fnaf3.png",
    tags: ["popular", "survival", "fun"]
  },
  {
    id: "fnaf4",
    title: "Five Nights at Freddy's 4",
    src: "https://dubdoo.com/games/fnaf4.html",
    img: "game%20logos/fnaf4.png",
    tags: ["popular", "survival", "fun"]
  },
  {
    id: "soccer-random",
    title: "Soccer Random",
    src: "https://dubdoo.com/games/soccerrandom.html",
    img: "game%20logos/soccer-random.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "boxing-random",
    title: "Boxing Random",
    src: "https://dubdoo.com/games/boxingrandom.html",
    img: "game%20logos/boxing-random.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "volley-random",
    title: "Volley Random",
    src: "https://dubdoo.com/games/volleyrandom.html",
    img: "game%20logos/volley-random.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "adventure-capitalist",
    title: "Adventure Capitalist",
    src: "https://dubdoo.com/games/adventurecapitalist.html",
    img: "game%20logos/adventurre-capatilist.png",
    tags: ["popular", "simulators", "fun"]
  },
  {
    id: "happy-wheels",
    title: "Happy Wheels",
    src: "https://happy-wheels-online.github.io/file/",
    img: "game%20logos/happy-wheels.png",
    tags: ["popular", "fun"]
  },
  {
    id: "minecraft",
    title: "Minecraft",
    src: "https://eaglercraft.app/web/",
    img: "game%20logos/minecraft.png",
    tags: ["popular", "survival", "multiplayer", "adventure", "3d", "best"]
  },
  {
    id: "wheelie-life",
    title: "Wheelie Life",
    src: "https://scratch.mit.edu/projects/1231016758/embed",
    img: "game%20logos/wheelie-life.png",
    tags: ["popular", "fun"]
  },
  {
    id: "tiny-fishing",
    title: "Tiny Fishing",
    src: "https://dubdoo.com/games/tinyfishing.html",
    img: "game%20logos/tiny-fishing.png",
    tags: ["popular", "fun"]
  },
  {
    id: "melon-sandbox",
    title: "Melon Sandbox",
    src: "https://melonplayground.io/game/melon-playground/",
    img: "game%20logos/melon-sandbox.png",
    tags: ["popular", "fun", "best"]
  },
  {
    id: "snow-rider-3d",
    title: "Snow Rider 3D",
    src: "https://snowriderx.github.io/snowrider3d/index.html",
    img: "game%20logos/snow-rider-3d.png",
    tags: ["popular", "racing", "fun"]
  },
  {
    id: "drift-boss",
    title: "Drift Boss",
    src: "https://driftbossonline.github.io/file/",
    img: "game%20logos/drift-boss.png",
    tags: ["popular", "racing", "cars", "fun"]
  },
  {
    id: "among-us",
    title: "Among Us",
    src: "https://dubdoo.com/games/amongus-html.html",
    img: "game%20logos/among-us.png",
    tags: ["popular", "multiplayer", "survival", "best", "new"]
  },
  {
    id: "little-alchemy-2",
    title: "Little Alchemy 2",
    src: "https://dubdoo.com/games/littlealchemy2.html",
    img: "game%20logos/little-alchemy-2.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "1v1-lol",
    title: "1v1 LOL",
    src: "https://1v1-lol-online.github.io/file/",
    img: "game%20logos/1v1-lol.png",
    tags: ["popular", "multiplayer", "3d", "fun", "best"]
  },
  {
    id: "cookie-clicker",
    title: "Cookie Clicker",
    src: "https://ubgwtf.gitlab.io/cookie-clicker/",
    img: "game%20logos/cookie-clicker.png",
    tags: ["popular", "simulators", "fun"]
  },
  {
    id: "ultrakill",
    title: "UltraKill",
    src: "https://dubdoo.com/games/ultrakill.html",
    img: "game%20logos/ultrakill.png",
    tags: ["popular", "survival", "fun", "best", "new"]
  },
  {
    id: "rocket-league",
    title: "Rocket League",
    src: "https://rocketgoal.io/",
    img: "game%20logos/rocket-league.png",
    tags: ["popular", "fun", "best", "new"]
  },
  {
    id: "crazy-cattle-3d",
    title: "Crazy Cattle 3D",
    src: "https://dubdoo.com/games/crazycattle3d.html",
    img: "game%20logos/crazy-cattle-3d.png",
    tags: ["popular", "fun"]
  },
  {
    id: "terraria",
    title: "Terraria",
    src: "https://dubdoo.com/games/terraria.html",
    img: "game%20logos/terraria.png",
    tags: ["popular", "survival", "adventure", "best"]
  },
  {
    id: "survivor-io",
    title: "Survivor.io",
    src: "https://dubdoo.com/games/survivorio.html",
    img: "game%20logos/survivor-io.png",
    tags: ["popular", "survival", "fun", "new"]
  },
  {
    id: "soundbuttons",
    title: "Soundbuttons",
    src: "https://dubdoo.com/games/soundboard.html",
    img: "game%20logos/soundbuttons.png",
    tags: ["popular", "fun"]
  },
  {
    id: "smashy-road",
    title: "Smashy Road",
    src: "https://smashy-road.io/smashy-road.embed",
    img: "game%20logos/smashy-road.png",
    tags: ["popular", "cars", "fun"]
  },
  {
    id: "papas-hotdoggeria",
    title: "Papa's Hotdoggeria",
    src: "https://dnrweqffuwjtx.cloudfront.net/games/2024/flash/papas-hot-doggeria/index.html",
    img: "game%20logos/papas-hotdoggeria.png",
    tags: ["popular", "fun"]
  },
  {
    id: "papas-freezeria",
    title: "Papa's Freezeria",
    src: "https://dnrweqffuwjtx.cloudfront.net/games/2024/flash/papas-freezeria/index.html",
    img: "game%20logos/papas-freezeria.png",
    tags: ["popular", "fun"]
  },
  {
    id: "papas-pastaria",
    title: "Papa's Pastaria",
    src: "https://dnrweqffuwjtx.cloudfront.net/games/2024/flash/papas-pastaria/index.html",
    img: "game%20logos/papas-pastaria.png",
    tags: ["popular", "fun"]
  },
  {
    id: "papas-donuteria",
    title: "Papa's Donuteria",
    src: "https://dnrweqffuwjtx.cloudfront.net/games/2024/flash/papas-donuteria/index.html",
    img: "game%20logos/papas-donuteria.png",
    tags: ["popular", "fun"]
  },

  // ===== NEW GAMES FROM UPDATED ZIP =====
  {
    id: "run-1",
    title: "Run 1",
    src: "https://dnrweqffuwjtx.cloudfront.net/games/2024/flash/run-1/index.html",
    img: "game%20logos/run-1.png",
    tags: ["popular", "adventure", "fun"]
  },
  {
    id: "run-2",
    title: "Run 2",
    src: "https://cdn.primarygames.com/ruffle_noTouchSupport/run2/",
    img: "game%20logos/run-2.png",
    tags: ["popular", "adventure", "fun"]
  },
  {
    id: "geometry-dash-meltdown",
    title: "Geometry Dash Meltdown",
    src: "https://lolygames.github.io/gd-melt/",
    img: "game%20logos/geometry-dash-meltdown.png",
    tags: ["popular", "fun"]
  },
  {
    id: "geometry-dash-world",
    title: "Geometry Dash World",
    src: "https://lolygames.github.io/gd-world/",
    img: "game%20logos/geometry-dash-world.png",
    tags: ["popular", "fun"]
  },
  {
    id: "helix-jump",
    title: "Helix Jump",
    src: "https://ubg365.github.io/helix-fruit-jump/",
    img: "game%20logos/helix-jump.png",
    tags: ["popular", "fun"]
  },
  {
    id: "retro-bowl-college",
    title: "Retro Bowl College",
    src: "https://www.yoosfuhl.com/game/retrobowlcollege/index.html",
    img: "game%20logos/retro-bowl-college.png",
    tags: ["popular", "fun"]
  },
  {
    id: "ahoy-survival",
    title: "Ahoy Survival",
    src: "https://frivez.com/games/ahoy-survival/index.html",
    img: "game%20logos/ahoy-survival.png",
    tags: ["survival", "adventure", "fun"]
  },
  {
    id: "moto-x3m-pool-party",
    title: "Moto X3M Pool Party",
    src: "https://class811.github.io/g/moto-x3m-pool-party/",
    img: "game%20logos/moto-x3m-pool-party.png",
    tags: ["racing", "fun"]
  },
  {
    id: "moto-x3m-spookyland",
    title: "Moto X3M Spookyland",
    src: "https://ubg365.github.io/motox3m-spooky/",
    img: "game%20logos/moto-x3m-spookyland.png",
    tags: ["racing", "fun"]
  },
  {
    id: "moto-x3m-winter",
    title: "Moto X3M Winter",
    src: "https://www.yoosfuhl.com/game/motox3m-winter/index.html",
    img: "game%20logos/moto-x3m-winter.png",
    tags: ["racing", "fun"]
  },
  {
    id: "polytrack",
    title: "Polytrack",
    src: "https://polytrack-online.github.io/file/",
    img: "game%20logos/polytrack.png",
    tags: ["racing", "fun"]
  },
  {
    id: "hole-io",
    title: "Hole.io",
    src: "https://holeio.bitbucket.io/file/",
    img: "game%20logos/hole-io.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "dumb-ways-to-die",
    title: "Dumb Ways to Die",
    src: "https://html5.gamedistribution.com/c88fe584f7c0425facc05167283329cc/?gd_sdk_referrer_url=https://www.kiloo.com/en/dumb-ways-to-die/",
    img: "game%20logos/dumb-ways-to-die.png",
    tags: ["popular", "fun"]
  },
  {
    id: "fall-guys",
    title: "Fall Guys",
    src: "https://html-classic.itch.zone/html/7581269/HTML5/index.html",
    img: "game%20logos/fall-guys.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "idle-breakout",
    title: "Idle Breakout",
    src: "https://idle-breakout.github.io/games/idle-breakout/index.html",
    img: "game%20logos/idle-breakout.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "space-waves",
    title: "Space Waves",
    src: "https://space-waves-unblocked.github.io/space-waves/",
    img: "game%20logos/space-waves.png",
    tags: ["fun", "adventure"]
  },
  {
    id: "basketball-bros",
    title: "Basketball Bros",
    src: "https://basketbros-unblocked.github.io/a7/basket-bros/",
    img: "game%20logos/basketball-bros.png",
    tags: ["popular", "multiplayer", "fun"]
  },
  {
    id: "red-ball-4",
    title: "Red Ball 4",
    src: "https://class811.github.io/g177/red-ball-4/",
    img: "game%20logos/red-ball-4.png",
    tags: ["popular", "adventure", "fun", "new"]
  },
  {
    id: "ragdoll-drop",
    title: "Ragdoll Drop",
    src: "https://freedomgamingzone.github.io/ragdoll-drop/",
    img: "game%20logos/ragdoll-drop.png",
    tags: ["fun"]
  },
  {
    id: "money-rush",
    title: "Money Rush",
    src: "https://thepizzaedition.io/work/MONEYRUSH/?gd_sdk_referrer_url=https://thepizzaedition.io/play/money-rush",
    img: "game%20logos/money-rush.png",
    tags: ["fun", "popular"]
  },
  {
    id: "worlds-hardest-game",
    title: "World's Hardest Game",
    src: "https://dnrweqffuwjtx.cloudfront.net/games/2024/flash/worlds-hardest-game/index.html",
    img: "game%20logos/worlds-hardest-game.png",
    tags: ["popular", "fun", "best"]
  },
  {
    id: "slice-master",
    title: "Slice Master",
    src: "https://bitlifeonline.github.io/slice-master/",
    img: "game%20logos/slice-master.png",
    tags: ["popular", "fun"]
  },
  {
    id: "fisquarium",
    title: "Fisquarium",
    src: "https://cdn2.addictinggames.com/addictinggames-content/ag-assets/content-items/html5-games/fisquarium/index.html?key=y8&value=default",
    img: "game%20logos/fisquarium.png",
    tags: ["fun"]
  },
  {
    id: "tomb-of-the-mask",
    title: "Tomb of the Mask",
    src: "https://baldis-basics-online.github.io/g26/class-438/",
    img: "game%20logos/tomb-of-the-mask.png",
    tags: ["popular", "adventure", "fun"]
  },
  {
    id: "duck-life-1",
    title: "Duck Life 1",
    src: "https://www.yoosfuhl.com/game/ducklife/index.html",
    img: "game%20logos/duck-life-1.png",
    tags: ["popular", "fun"]
  },
  {
    id: "a-small-world-cup",
    title: "A Small World Cup",
    src: "https://a-small-world-cup.vercel.app/file/",
    img: "game%20logos/a-small-world-cup.png",
    tags: ["soccer", "multiplayer", "fun", "best"]
  },
  {
    id: "backrooms",
    title: "Backrooms",
    src: "https://backroomsgame.io/game/backrooms/",
    img: "game%20logos/backrooms.png",
    tags: ["adventure", "survival", "popular", "new"]
  },

  // ===== FROM PREVIOUS JS ARRAY (not in zip) =====
  {
    id: "murder",
    title: "Murder",
    src: "https://jamestore214.github.io/g72/class-580/",
    img: "https://jamestore214.github.io/img/class-580.png",
    tags: ["new", "multiplayer", "fun"]
  },
  {
    id: "swat",
    title: "Swat",
    src: "https://mc0825.github.io/g97/class-792/",
    img: "https://jamestore214.github.io/img/class-792.png",
    tags: [  "survival", "3d"]
  },
  {
    id: "lol",
    title: "lol",
    src: "https://mc0825.github.io/g20/class-440/",
    img: "https://jamestore214.github.io/img/class-440.png",
    tags: ["new", "multiplayer", "fun"]
  },
  {
    id: "snow-rider",
    title: "Snow Rider",
    src: "https://mc0825.github.io/g26/class-537/",
    img: "https://jamestore214.github.io/img/class-537.png",
    tags: [ "racing", "fun"]
  },
  {
    id: "shotz",
    title: "Shotz",
    src: "https://mc0825.github.io/g22/class-394/",
    img: "https://mc0825.github.io/img/class-394.png",
    tags: ["survival", "3d"]
  },
  {
    id: "goalkeeper-challenge",
    title: "Goalkeeper Challenge",
    src: "https://mc0825.github.io/g68/class-1049/",
    img: "https://mc0825.github.io/img/class-1049.png",
    tags: ["soccer", "3d"]
  },
  {
    id: "stair-race",
    title: "Stair Race 3D",
    src: "https://mc0825.github.io/g2/class-619/",
    img: "https://mc0825.github.io/img/class-619.png",
    tags: ["popular", "3d", "fun"]
  },
  {
    id: "sausage-flip",
    title: "Sausage Flip",
    src: "https://mc0825.github.io/g2/class-415/",
    img: "https://mc0825.github.io/img/class-415.png",
    tags: ["popular", "puzzle", "fun"]
  },
  {
    id: "fireboy-and-watergirl",
    title: "Fireboy and Watergirl",
    src: "https://mc0825.github.io/g177/class-346/",
    img: "https://mc0825.github.io/img/class-346.png",
    tags: ["popular", "puzzle", "multiplayer", "best"]
  },
  {
    id: "fruit-ninja",
    title: "Fruit Ninja",
    src: "https://mc0825.github.io/g50/class-22/",
    img: "https://mc0825.github.io/img/class-22.png",
    tags: ["popular", "girls", "fun"]
  },
  {
    id: "gobble-top",
    title: "Gobble Top",
    src: "https://mc0825.github.io/g9/class-420/",
    img: "https://mc0825.github.io/img/class-420.png",
    tags: ["survival", "multiplayer"]
  },
  {
    id: "traffic-rush",
    title: "Traffic Rush",
    src: "https://mc0825.github.io/g22/class-393/",
    img: "https://mc0825.github.io/img/class-393.png",
    tags: ["puzzle", "cars", "fun"]
  },
  {
    id: "penalty-kick",
    title: "Penalty Kick",
    src: "https://mc0825.github.io/g5/class-519/",
    img: "https://mc0825.github.io/img/class-519.png",
    tags: ["soccer", "3d"]
  },
  {
    id: "blumgi-soccer",
    title: "Blumgi Soccer",
    src: "https://mc0825.github.io/g68/class-1050/",
    img: "https://mc0825.github.io/img/class-1050.png",
    tags: ["soccer", "fun"]
  },
  {
    id: "stick-rush",
    title: "Stick Rush",
    src: "https://mc0825.github.io/g68/class-982/",
    img: "https://mc0825.github.io/img/class-982.png",
    tags: ["survival", "adventure"]
  },
  {
    id: "bumper-cars-soccer",
    title: "Bumper Cars Soccer",
    src: "https://mc0825.github.io/g16/class-665/",
    img: "https://mc0825.github.io/img/class-665.png",
    tags: ["soccer", "cars", "multiplayer", "fun"]
  },
  {
    id: "elastic-man",
    title: "Elastic Man",
    src: "https://mc0825.github.io/g97/class-500/",
    img: "https://mc0825.github.io/img/class-500.png",
    tags: ["popular", "fun", "girls"]
  },
  {
    id: "super-soccer",
    title: "Super Soccer",
    src: "https://mc0825.github.io/g69/class-628/",
    img: "https://mc0825.github.io/img/class-628.png",
    tags: ["soccer", "multiplayer"]
  },
  {
    id: "idle-lumber",
    title: "Idle Lumber",
    src: "https://mc0825.github.io/g72/class-586/",
    img: "https://mc0825.github.io/img/class-586.png",
    tags: ["simulators", "fun"]
  },
  {
    id: "school-escape",
    title: "School Escape",
    src: "https://mc0825.github.io/g72/class-894/",
    img: "https://mc0825.github.io/img/class-894.png",
    tags: ["adventure", "survival", "fun"]
  },
  {
    id: "stunt-cars",
    title: "Madalin Stunt Cars",
    src: "https://mc0825.github.io/g5/class-566/",
    img: "https://mc0825.github.io/img/class-566.png",
    tags: ["racing", "cars", "3d", "multiplayer", "best"]
  },
  {
    id: "parking-fury",
    title: "Parking Fury 3D",
    src: "https://mc0825.github.io/g3/class-725/",
    img: "https://mc0825.github.io/img/class-725.png",
    tags: ["racing", "cars", "3d", "simulators", "new"]
  },
  {
    id: "monster-tracks",
    title: "Monster Tracks",
    src: "https://mc0825.github.io/g72/class-414/",
    img: "https://mc0825.github.io/img/class-414.png",
    tags: ["racing", "cars", "fun"]
  },
  {
    id: "supercars-royale",
    title: "Supercars Royale",
    src: "https://mc0825.github.io/g66/class-976/",
    img: "https://mc0825.github.io/img/class-976.png",
    tags: ["racing", "cars", "3d", "multiplayer"]
  },
  {
    id: "ground-digger",
    title: "Ground Digger",
    src: "https://mc0825.github.io/g68/class-1067/",
    img: "https://mc0825.github.io/img/class-1067.png",
    tags: ["simulators", "survival"]
  },
  {
    id: "bike",
    title: "MotorBike",
    src: "https://mc0825.github.io/g68/class-1078/",
    img: "https://mc0825.github.io/img/class-1078.png",
    tags: ["racing", "3d"]
  },
  {
    id: "viking",
    title: "Viking Village",
    src: "https://mc0825.github.io/g66/class-1005/",
    img: "https://mc0825.github.io/img/class-1005.png",
    tags: ["adventure", "survival", "fun"]
  },
  {
    id: "rocket",
    title: "Blumgi Rocket",
    src: "https://mc0825.github.io/g16/class-413/",
    img: "https://mc0825.github.io/img/class-413.png",
    tags: ["racing", "fun"]
  },
  {
    id: "sniper",
    title: "Lethal Sniper 3D",
    src: "https://mc0825.github.io/g74/class-257/",
    img: "https://mc0825.github.io/img/class-257.png",
    tags: ["3d", "survival", "best"]
  },
  {
    id: "alien",
    title: "Aliens Nest",
    src: "https://mc0825.github.io/g74/class-275/",
    img: "https://mc0825.github.io/img/class-275.png",
    tags: ["survival", "adventure"]
  },
  {
    id: "johny-shooter",
    title: "Johnny Trigger Action Shooter",
    src: "https://mc0825.github.io/g66/class-953/",
    img: "https://mc0825.github.io/img/class-953.png",
    tags: ["3d", "survival", "best"]
  },
  {
    id: "idle-ants",
    title: "Idle Ants",
    src: "https://mc0825.github.io/g72/class-631/",
    img: "https://mc0825.github.io/img/class-631.png",
    tags: ["simulators", "fun"]
  },
  {
    id: "stickman",
    title: "Stickman Hook",
    src: "https://jamestore214.github.io/g5/class-406/",
    img: "https://mc0825.github.io/img/class-406.png",
    tags: ["popular", "adventure", "fun"]
  },
  {
    id: "rush",
    title: "Tunnel Rush",
    src: "https://jamestore214.github.io/g69/class-653/",
    img: "https://mc0825.github.io/img/class-653.png",
    tags: ["popular", "3d", "fun"]
  },
  {
    id: "defenders",
    title: "Stick Defenders",
    src: "https://jamestore214.github.io/g2/class-416/",
    img: "https://mc0825.github.io/img/class-416.png",
    tags: ["survival", "multiplayer"]
  },
  {
    id: "parkour",
    title: "DeadHead Parkour",
    src: "https://jamestore214.github.io/g97/class-412/",
    img: "https://mc0825.github.io/img/class-412.png",
    tags: ["popular", "adventure", ]
  },
  {
    id: "paperio",
    title: "Paper Io 3d",
    src: "https://lesson1225.github.io/lesson305/lesson-414/",
    img: "https://lesson1225.github.io/img/lesson-414.png",
    tags: ["multiplayer", "3d", "new"]
  },
  {
    id: "clusterrush",
    title: "Cluster Rush",
    src: "https://lesson1225.github.io/lesson302/lesson-129/",
    img: "https://lesson1225.github.io/img/lesson-129.png",
    tags: ["adventure", "3d"]
  },
  {
    id: "shotter3573",
    title: "Time Shooter 3",
    src: "https://lesson1225.github.io/lesson85/lesson-2232/",
    img: "https://lesson1225.github.io/img/lesson-2232.png",
    tags: ["3d", "survival", "popular"]
  },
  {
    id: "pubg",
    title: "Pubg",
    src: "https://lesson1225.github.io/lesson85/lesson-2233/",
    img: "https://lesson1225.github.io/img/lesson-2233.png",
    tags: ["survival", "multiplayer", "3d", "new", "popular"]
  },
  {
    id: "plantsvs",
    title: "Plants vs Zombies",
    src: "https://lesson1225.github.io/lesson305/lesson-416/",
    img: "https://lesson1225.github.io/img/lesson-416.png",
    tags: ["puzzle", "survival", "new", "popular"]
  },
  {
    id: "headsoccer",
    title: "Head Soccer",
    src: "https://lesson1225.github.io/lesson302/lesson-72/",
    img: "https://lesson1225.github.io/img/lesson-72.png",
    tags: ["soccer", "multiplayer"]
  },
  {
    id: "cardfa",
    title: "Crazy Car",
    src: "https://unblocked-games.s3.amazonaws.com/games/2023/mjs/idle-mining-empire/index.html",
    img: "https://unblocked-games.s3.amazonaws.com/media/posts/372/responsive/idle-mining-empire-512-xs.jpg",
    tags: ["adventure", "survival", "popular"]
  },
  {
    id: "wafed",
    title: "Backflip Challenge",
    src: "https://d23tskfudfp1j.cloudfront.net/games/2026/unity/backflip-challenge/index.html",
    img: "https://unblocked-games.s3.amazonaws.com/media/posts/743/responsive/backflip-challenge-game-sm.webp",
    tags: ["adventure", "survival",  "popular"]
  },
  {
    id: "wafed",
    title: "Backflip Challenge",
    src: "https://html5.gamemonetize.co/18n99dqsu01rpazmf1m06hlqsz3fqlf3/",
    img: "https://unblocked-games.s3.amazonaws.com/media/posts/743/responsive/backflip-challenge-game-sm.webp",
    tags: ["adventure", "survival",  "popular"]
  },
];


