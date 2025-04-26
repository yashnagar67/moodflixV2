// Sample movie data array with 50 popular movies
const sampleMovies = [
    {
      id: 1,
      title: "Inception",
      poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
      overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: 'inception'."
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden."
    },
    {
      id: 3,
      title: "The Godfather",
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers."
    },
    {
      id: 4,
      title: "The Dark Knight",
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets."
    },
    {
      id: 5,
      title: "Pulp Fiction",
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper."
    },
    {
      id: 6,
      title: "Fight Club",
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town."
    },
    {
      id: 7,
      title: "Forrest Gump",
      poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      overview: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him."
    },
    {
      id: 8,
      title: "The Matrix",
      poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      overview: "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth."
    },
    {
      id: 9,
      title: "Goodfellas",
      poster_path: "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      overview: "The true story of Henry Hill, a half-Irish, half-Sicilian Brooklyn kid who is adopted by neighbourhood gangsters at an early age and climbs the ranks of a Mafia family under the guidance of Jimmy Conway."
    },
    {
      id: 10,
      title: "The Silence of the Lambs",
      poster_path: "/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
      overview: "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism."
    },
    {
      id: 11,
      title: "Interstellar",
      poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage."
    },
    {
      id: 12,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      poster_path: "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      overview: "Young hobbit Frodo Baggins, after inheriting a mysterious ring from his uncle Bilbo, must leave his home in order to keep it from falling into the hands of its evil creator."
    },
    {
      id: 13,
      title: "Parasite",
      poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
      overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident."
    },
    {
      id: 14,
      title: "The Departed",
      poster_path: "/jkUrA8jXFBfjaHvrfmnejm00AKP.jpg",
      overview: "To take down South Boston's Irish Mafia, the police send in one of their own to infiltrate the underworld, not realizing the syndicate has done likewise."
    },
    {
      id: 15,
      title: "Whiplash",
      poster_path: "/6uSPcdGNA2A6vJmCagXkvnutegs.jpg",
      overview: "Under the direction of a ruthless instructor, a talented young drummer begins to pursue perfection at any cost, even his humanity."
    },
    {
      id: 16,
      title: "Gladiator",
      poster_path: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      overview: "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos. Maximus is one of the Roman army's most capable and trusted generals and a key advisor to the emperor."
    },
    {
      id: 17,
      title: "The Prestige",
      poster_path: "/bdN3gXuYBCLZXCwUyzr7XyNIlnn.jpg",
      overview: "A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy with dangerous and deadly consequences."
    },
    {
      id: 18,
      title: "The Usual Suspects",
      poster_path: "/hKcSstkyfpJY6TgkH9qOIGWMVXL.jpg",
      overview: "Held in an L.A. interrogation room, Verbal Kint attempts to convince the feds that a mythic crime lord, Keyser Soze, not only exists, but was also responsible for drawing him and his four partners into a multi-million dollar heist that ended with an explosion in San Pedro harbor."
    },
    {
      id: 19,
      title: "Inglourious Basterds",
      poster_path: "/7sfbEnaARXDDhXm9HSxyJjM68R8.jpg",
      overview: "In Nazi-occupied France during World War II, a group of Jewish-American soldiers known as 'The Basterds' are chosen specifically to spread fear throughout the Third Reich by scalping and brutally killing Nazis."
    },
    {
      id: 20,
      title: "Joker",
      poster_path: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      overview: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure."
    },
    {
      id: 21,
      title: "Avengers: Endgame",
      poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all."
    },
    {
      id: 22,
      title: "The Wolf of Wall Street",
      poster_path: "/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
      overview: "A New York stockbroker refuses to cooperate in a large securities fraud case involving corruption on Wall Street, corporate banking world and mob infiltration."
    },
    {
      id: 23,
      title: "Avatar",
      poster_path: "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
      overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization."
    },
    {
      id: 24,
      title: "Titanic",
      poster_path: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      overview: "101-year-old Rose DeWitt Bukater tells the story of her life aboard the Titanic, 84 years later. A young Rose boards the ship with her mother and fiancé. Meanwhile, Jack Dawson and Fabrizio De Rossi win third-class tickets aboard the ship."
    },
    {
      id: 25,
      title: "The Lion King",
      poster_path: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
      overview: "A young lion prince is cast out of his pride by his cruel uncle, who claims he killed his father. While the uncle rules with an iron paw, the prince grows up beyond the Savannah, living by a philosophy: No worries for the rest of your days."
    },
    {
      id: 26,
      title: "Jurassic Park",
      poster_path: "/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
      overview: "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors."
    },
    {
      id: 27,
      title: "Star Wars: A New Hope",
      poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
      overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire."
    },
    {
      id: 28,
      title: "The Green Mile",
      poster_path: "/8VG8fDNiy50H7marlpZ2oMCw7G0.jpg",
      overview: "A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people's ailments. When the cell block's head guard, Paul Edgecomb, recognizes Coffey's miraculous gift, he tries desperately to help stave off the condemned man's execution."
    },
    {
      id: 29,
      title: "Back to the Future",
      poster_path: "/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
      overview: "Eighties teenager Marty McFly is accidentally sent back in time to 1955, inadvertently disrupting his parents' first meeting and attracting his mother's romantic interest. Marty must repair the damage to history by rekindling his parents' romance and - with the help of his eccentric inventor friend Doc Brown - return to 1985."
    },
    {
      id: 30,
      title: "Spirited Away",
      poster_path: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
      overview: "A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family."
    },
    {
      id: 31,
      title: "Alien",
      poster_path: "/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
      overview: "During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed."
    },
    {
      id: 32,
      title: "Oldboy",
      poster_path: "/jB7loTNvZ2dxXulJY7tAQ8oqhPE.jpg",
      overview: "With no clue how he came to be imprisoned, drugged and tortured for 15 years, a desperate businessman seeks revenge on his captors."
    },
    {
      id: 33,
      title: "Eternal Sunshine of the Spotless Mind",
      poster_path: "/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
      overview: "Joel Barish, heartbroken that his girlfriend underwent a procedure to erase him from her memory, decides to do the same. However, as he watches his memories of her fade away, he realises that he still loves her, and may be too late to correct his mistake."
    },
    {
      id: 34,
      title: "The Truman Show",
      poster_path: "/vuza0WqY239yBXOadKlGwJHYJGx.jpg",
      overview: "Truman Burbank is the star of The Truman Show, a 24-hour-a-day reality TV show that broadcasts every aspect of his life without his knowledge. His entire life has been an unending soap opera for consumption by the rest of the world. And everyone he knows, including his wife and his best friend is really an actor, paid to be part of his life."
    },
    {
      id: 35,
      title: "Toy Story",
      poster_path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      overview: "Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences."
    },
    {
      id: 36,
      title: "A Clockwork Orange",
      poster_path: "/4sHeTAp65WrSSuc05nRBKddhBxO.jpg",
      overview: "In a near-future Britain, young Alexander DeLarge and his pals get their kicks beating and raping anyone they please. When not destroying the lives of others, Alex swoons to the music of Beethoven. The state, eager to crack down on juvenile crime, gives an incarcerated Alex the option to undergo an invasive procedure that'll rob him of all personal agency. In a time when conscience is a commodity, can Alex change his tune?"
    },
    {
      id: 37,
      title: "The Thing",
      poster_path: "/tzGY49kseSE9QAKk47uuDGwnSCu.jpg",
      overview: "Members of an American scientific research outpost in Antarctica find themselves battling a parasitic alien organism capable of perfectly imitating its victims. They soon discover that this task will be harder than they thought, as they don't know which members of the team have already been assimilated and their paranoia threatens to tear them apart."
    },
    {
      id: 38,
      title: "The Sixth Sense",
      poster_path: "/4AfSDiG7Vw3v5TmveEjgDDH8AjT.jpg",
      overview: "A psychological thriller about an eight year old boy named Cole Sear who believes he can see into the world of the dead. A child psychologist named Malcolm Crowe comes to Cole to help him deal with his problem, learning that he really can see the ghosts of dead people."
    },
    {
      id: 39,
      title: "No Country for Old Men",
      poster_path: "/6d5XOczc226cGjsUUs8iqNPKidO.jpg",
      overview: "Llewelyn Moss stumbles upon dead bodies, $2 million and a hoard of heroin in a Texas desert, but methodical killer Anton Chigurh comes looking for it, with local sheriff Ed Tom Bell hot on his trail. The roles of prey and predator blur as the violent pursuit of money and justice collide."
    },
    {
      id: 40,
      title: "The Grand Budapest Hotel",
      poster_path: "/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
      overview: "The Grand Budapest Hotel tells of a legendary concierge at a famous European hotel between the wars and his friendship with a young employee who becomes his trusted protégé. The story involves the theft and recovery of a priceless Renaissance painting, the battle for an enormous family fortune and the slow and then sudden upheavals that transformed Europe during the first half of the 20th century."
    },
    {
      id: 41,
      title: "Blade Runner",
      poster_path: "/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg",
      overview: "In the smog-choked dystopian Los Angeles of 2019, blade runner Rick Deckard is called out of retirement to terminate a quartet of replicants who have escaped to Earth seeking their creator for a way to extend their short life spans."
    },
    {
      id: 42,
      title: "Dune",
      poster_path: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
      overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive."
    },
    {
      id: 43,
      title: "The Shining",
      poster_path: "/nRj5511mZdTl4saWEPoj9QroTIu.jpg",
      overview: "Jack Torrance accepts a caretaker job at the Overlook Hotel, where he, along with his wife Wendy and their son Danny, must live isolated from the rest of the world for the winter. But they aren't prepared for the madness that lurks within."
    },
    {
      id: 44,
      title: "Casablanca",
      poster_path: "/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg",
      overview: "In Casablanca, Morocco in December 1941, a cynical American expatriate meets a former lover, with unforeseen complications."
    },
    {
      id: 45,
      title: "Citizen Kane",
      poster_path: "/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg",
      overview: "Newspaper magnate, Charles Foster Kane is taken from his mother as a boy and made the ward of a rich industrialist. As a result, every well-meaning, tyrannical or self-destructive move he makes for the rest of his life appears in some way to be a reaction to that deeply wounding event."
    },
    {
      id: 46,
      title: "Seven Samurai",
      poster_path: "/iAq0sq42vKTLneVGqHn1D4GzgrM.jpg",
      overview: "A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits, so the samurai gathers six others to help him teach the people how to defend themselves, and the villagers provide the soldiers with food."
    },
    {
      id: 47,
      title: "Apocalypse Now",
      poster_path: "/saHdH2wjATzsA5U8DKxQzeJ1CbS.jpg",
      overview: "At the height of the Vietnam war, Captain Benjamin Willard is sent on a dangerous mission that, officially, 'does not exist, nor will it ever exist.' His goal is to locate - and eliminate - a mysterious Green Beret Colonel named Walter Kurtz who has been leading his personal army on illegal guerrilla missions into enemy territory."
    },
    {
      id: 48,
      title: "2001: A Space Odyssey",
      poster_path: "/ve72VxNqjGM69Uky4WTo76Sf7OX.jpg", 
      overview: "Humanity finds a mysterious object buried beneath the lunar surface and sets off to find its origins with the help of HAL 9000, the world's most advanced super computer."
    },
    {
      id: 49,
      title: "The Exorcist",
      poster_path: "/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg",
      overview: "12-year-old Regan MacNeil begins to adapt an explicit new personality as strange events befall the local area of Georgetown. Her mother becomes torn between science and superstition in a desperate bid to save her daughter, and ultimately turns to her last hope: Father Damien Karras, a troubled priest who is struggling with his own faith."
    },
    {
      id: 50,
      title: "Psycho",
      poster_path: "/tdqX0MWaFHuGwUygYn7j6uIHtdI.jpg",
      overview: "When larcenous real estate clerk Marion Crane goes on the lam with a wad of cash and hopes of starting a new life, she ends up at the notorious Bates Motel, where manager Norman Bates cares for his housebound mother."
    }
  ];
  
  export default sampleMovies;