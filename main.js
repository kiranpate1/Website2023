//grid generator 

var tileItems = ["About", "Daybreak", "Freelance", "Superpower", "Workmade", "Music", "Pursuit", "Artwork", "Elections","??????"]
var tileDescriptions = [
  "Who am I? How am I? Why am I?", 
  "I guess it's where I work. But it's also where I play.", 
  "Clients are annoying, pls stop contacting me y'all.", 
  "I wish I could fly. Or teleport. Or both.", 
  "Workm... Wait, don't be do enough work around here?", 
  "Yeah, it's a bit of a mess. But it's my mess.", 
  "I'm in pursuit of happiness. And tacos.", 
  "Sometimes I pretend I'm an artist. But I'm not.", 
  "Vote for me. I'm the best candidate. I promise.",
  "Hmmm I wonder what this does... Fuck around and find out?"
]

setup()

function setup() {
  generate()

  // randomized layout
  
  function generate() {
    var grid_0_0 = Math.floor(Math.random() * (tileItems.length - 6)) + 3
    var grid_0_1 = tileItems.length - grid_0_0
    configureLayout('0','column','0-0',grid_0_0,'0-1',grid_0_1)

    var grid_0_0_0 = Math.floor(Math.random() * (grid_0_0 - 4)) + 2
    var grid_0_0_1 = grid_0_0 - grid_0_0_0
    configureLayout('0-0','row','0-0-0',grid_0_0_0,'0-0-1',grid_0_0_1)

    if (grid_0_0_0 >= 3) {
      configureTiles(grid_0_0_0,'0-0-0','column')
    } else if (grid_0_0_0 == 2) {
      configureLayout('0-0-0','column','0-0-0-0',1,'0-0-0-1',1)
    }
    if (grid_0_0_1 >= 3) {
      configureTiles(grid_0_0_1,'0-0-1','column')
    } else if (grid_0_0_1 == 2) {
      configureLayout('0-0-1','column','0-0-1-0',1,'0-0-1-1',1)
    }

    var grid_0_1_0 = Math.floor(Math.random() * (grid_0_1 - 4)) + 2
    var grid_0_1_1 = grid_0_1 - grid_0_1_0
    configureLayout('0-1','row','0-1-0',grid_0_1_0,'0-1-1',grid_0_1_1)

    if (grid_0_1_0 >= 3) {
      configureTiles(grid_0_1_0,'0-1-0','column')
    } else if (grid_0_1_0 == 2) {
      configureLayout('0-1-0','column','0-1-0-0',1,'0-1-0-1',1)
    }
    if (grid_0_1_1 >= 3) {
      configureTiles(grid_0_1_1,'0-1-1','column')
    } else if (grid_0_1_1 == 2) {
      configureLayout('0-1-1','column','0-1-1-0',1,'0-1-1-1',1)
    }
  }

  function configureTiles(input,name,direction) {
    var var1 = Math.floor(Math.random() * (input - 3)) + (Math.floor(Math.random() * 2) + 1)
    var var2 = input - var1
    configureLayout(name,direction,name+'-0',var1,name+'-1',var2)

    if ((var1 >= 3) && (direction == 'column')) {
      configureTiles(var1,name+'-0','row')
    } else if ((var1 >= 3) && (direction == 'row')) {
      configureTiles(var1,name+'-0','column')
    } else if ((var1 == 2) && (direction == 'column')) {
      configureLayout(name+'-0','row',name+'-0-0',1,name+'-0-1',1)
    } else if ((var1 == 2) && (direction == 'row')) {
      configureLayout(name+'-0','column',name+'-0-0',1,name+'-0-1',1)
    }
    
    if ((var2 >= 3) && (direction == 'column')) {
      configureTiles(var2,name+'-1','row')
    } else if ((var2 >= 3) && (direction == 'row')) {
      configureTiles(var2,name+'-1','column')
    } else if ((var2 == 2) && (direction == 'column')) {
      configureLayout(name+'-1','row',name+'-1-0',1,name+'-1-1',1)
    } else if ((var2 == 2) && (direction == 'row')) {
      configureLayout(name+'-1','column',name+'-1-0',1,name+'-1-1',1)
    }
  }

  function configureLayout(parentName,parentDirection,child0Name,child0Input,child1Name,child1Input) {
    var template = (Math.floor(Math.random() * 4) + 5)
    if (child0Input > child1Input) {
      appendTiles(parentName,parentDirection,["1", (template/10)],child0Name,child0Input,child1Name,child1Input)
    } else if (child0Input < child1Input) {
      appendTiles(parentName,parentDirection,[(template/10), "1"],child0Name,child0Input,child1Name,child1Input)
    } else if (child0Input == child1Input) {
      appendTiles(parentName,parentDirection,[(template/10), "1"],child0Name,child0Input,child1Name,child1Input)
    }
    if (child0Input == 1) {
      appendTiles(child0Name,'','','','','','')
    }
    if (child1Input == 1) {
      appendTiles(child1Name,'','','','','','')
    }
  }

  function appendTiles(parentName,parentDirection,parentTemplate,child0Name,child0Input,child1Name,child1Input) {
    var gridItem = document.createElement("div")
    gridItem.setAttribute("type", "grid-item")
    gridItem.id = 'grid-'+parentName
    gridItem.style.display = 'grid'
    if (((parentName.slice(-1) == "0") && (parentDirection == 'column')) || ((parentName.slice(-1) == "0") && (parentDirection == 'row'))) {
      gridItem.style.gridArea = "1 / 1 / auto / auto"
    }
    if (((parentName.slice(-1) == "1") && (parentDirection == 'column') && (window.innerWidth < window.innerHeight)) || ((parentName.slice(-1) == "1") && (parentDirection == 'row') && (window.innerWidth > window.innerHeight))) {
      gridItem.style.gridArea = "1 / 2 / auto / auto"
    } else if (((parentName.slice(-1) == "1") && (parentDirection == 'row') && (window.innerWidth < window.innerHeight)) || ((parentName.slice(-1) == "1") && (parentDirection == 'column') && (window.innerWidth > window.innerHeight))) {
      gridItem.style.gridArea = "2 / 1 / auto / auto"
    }
    if ((parentDirection == 'row') && (window.innerWidth < window.innerHeight) || (parentDirection == 'column') && (window.innerWidth > window.innerHeight)) {
      document.documentElement.style.setProperty('--hover-'+child0Name, '1fr / ' + [Number(parentTemplate[0])+Number(0.1)] + 'fr ' + parentTemplate[1] + 'fr')
      document.documentElement.style.setProperty('--hover-'+child1Name, '1fr / ' + [Number(parentTemplate[0])-Number(0.1)] + 'fr ' + parentTemplate[1] + 'fr')
      gridItem.style.gridTemplate = "1fr / " + parentTemplate[0] + "fr " + parentTemplate[1] + "fr"
    }
    if ((parentDirection == 'column') && (window.innerWidth < window.innerHeight) || (parentDirection == 'row') && (window.innerWidth > window.innerHeight)) {
      document.documentElement.style.setProperty('--hover-'+child0Name, [Number(parentTemplate[0])+Number(0.1)] + 'fr ' + parentTemplate[1] + 'fr / 1fr')
      document.documentElement.style.setProperty('--hover-'+child1Name, [Number(parentTemplate[0])-Number(0.1)] + 'fr ' + parentTemplate[1] + 'fr / 1fr')
      gridItem.style.gridTemplate = parentTemplate[0] + "fr " + parentTemplate[1] + "fr" + " / 1fr"
    }
    document.getElementById('grid-'+parentName.slice(0,-2)).appendChild(gridItem)
  }

  //tile onmouseover

  var gridWrapper = document.querySelector("#grid-")
  var gridItems = document.querySelectorAll('[type="grid-item"]')
  var backgroundBlur = document.querySelector(".background-blur")

  tileMouseover()
  function tileMouseover() {
    for (let i = 0; i < gridItems.length; i++) {
      if (gridItems[i].children.length == '0') {
        gridItems[i].setAttribute("type", "tile")
        var content = document.createElement("div")
        content.classList.add('tile-content')
        gridItems[i].appendChild(content)
      }
      gridItems[i].addEventListener("mouseover", function(){
        gridItems[i].parentElement.classList.add('hover-'+gridItems[i].id)
      })
      gridItems[i].addEventListener("mouseout", (event) => {
        gridItems[i].parentElement.classList.remove('hover-'+gridItems[i].id)
      })
    }
  }

  //load in tiles/blur

  var tiles = document.querySelectorAll('[type="tile"]')

  tiles.forEach(function(tile, index) {
    setTimeout(function() {
      tile.style.opacity = '1'
    }, index * 50)
    tile.addEventListener("mouseover", function(){
      tile.classList.add('hover')
      setTimeout(function() {
        if (!document.body.classList.contains('project-open')) {
          translateBlur(index)
        }
      }, 200)
    })
    tile.addEventListener("mousemove", (event) => {
      const rect = tile.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      backgroundBlur.style.transform = `translate3d(${x}px,${y}px,0)`
    })
    tile.addEventListener("mouseout", function(){
      tile.classList.remove('hover')
      setTimeout(function() {
        backgroundBlur.style.opacity = '0'
      }, 200)
    })
  })

  function translateBlur(i) {
    backgroundBlur.style.opacity = '1'
    var tileRect = tiles[i].getBoundingClientRect()
    backgroundBlur.style.top = tileRect.top + 'px'
    backgroundBlur.style.left = tileRect.left + 'px'
    backgroundBlur.style.width = tileRect.width + 'px'
    backgroundBlur.style.height = tileRect.height + 'px'
  }

  //tile onclick

  var tileSize = []
  var shuffle = document.querySelector(".shuffle")  

  tileClick()
  function tileClick() {
    tiles.forEach(function(tile, index) {
      var width = tile.getBoundingClientRect().width
      var height = tile.getBoundingClientRect().height
      var size = width * height
      tileSize.push({index, size, width, height})
    })
    var tileSizeOrdered = group(tileSize)

    for (let i = 0; i < tileSizeOrdered.length; i++) {
      // tiles[i].classList.add(tileItems[i])
      tiles[i].onclick = function() {
        expandtiles()
        expandtile(i)
      }
    }

    const smallestTile = tiles[tileSizeOrdered[tileSizeOrdered.length - 1].key]
    const largestTile = tiles[tileSizeOrdered[0].key]
    tileSizeOrdered.forEach(function(tile, index) {
      //tiles[tile.key].style.zIndex = (tiles.length - index)
      const tileInfo = document.createElement("div")
      tileInfo.classList.add('tile-info')
      tiles[tile.key].querySelector('.tile-content').appendChild(tileInfo)
      
      const tiletitle = document.createElement("h1")
      tiletitle.textContent = tileItems[index]
      tiletitle.style.fontSize = `min(${(tile.height / 5)}px,${(tile.width / 10)}px)`
      tileInfo.appendChild(tiletitle)

      const tileDescription = document.createElement("p")
      tileDescription.textContent = tileDescriptions[index]
      tileDescription.style.width = `${tile.width * 0.7}px`
      tileDescription.style.top = `min(${(tile.height / 5)}px,${(tile.width / 10)}px)`
      tileDescription.style.marginTop = `${tile.width * 0.05}px`
      tileInfo.appendChild(tileDescription)

      const tileCardsWrapper = document.createElement("div")
      tileCardsWrapper.classList.add('tile-cards-wrapper')
      tiles[tile.key].querySelector('.tile-content').appendChild(tileCardsWrapper)

      const tileCards = document.createElement("div")
      if ((tile.width / 1.5) > tile.height) {
        tiles[tile.key].querySelector('.tile-content').classList.add('horizontal')
        // tileCards.style.minHeight = `${tile.height * 0.7}px`
      } else {
        tiles[tile.key].querySelector('.tile-content').classList.add('vertical')
        tileCards.style.minWidth = `${tile.width * 0.7}px`
      }
      tileCards.classList.add('tile-cards')
      for (let i = 0; i < 3; i++) {
        const tileCard = document.createElement("div")
        tileCard.classList.add('tile-card')
        tileCard.style.transform = `scale(${(8+i)/10})`
        tileCards.appendChild(tileCard)
        tiles[tile.key].addEventListener("mouseover", function(){
          tileCard.style.transform = `scale(${(i*0.1) + 1.3})`
        })
        tiles[tile.key].addEventListener("mouseout", function(){
          tileCard.style.transform = `scale(${(8+i)/10})`
        })
      }
      tileCardsWrapper.appendChild(tileCards)
    })

    tiles.forEach(function(tile, index) {
      tile.querySelector('.tile-cards').style.opacity = '0'
      setTimeout(function() {
        tile.querySelector('.tile-cards').style.opacity = '1'
      }, index * 50 + 400)
      setTimeout(function() {
        tile.querySelector('.tile-cards').style.opacity = '0'
      }, index * 50 + 700)
    })

    //party mode
    smallestTile.querySelector(".tile-content h1").innerHTML = "??????"
    smallestTile.onclick = function() {
      toggleParty('on')
      setTimeout(function() {toggleParty('off')}, 2000)
    }
    function toggleParty(toggle) {
      var uniqueNumbers = new Set();

      while (uniqueNumbers.size < tiles.length) {
        var randomNumber = Math.floor(Math.random() * 43); 
        uniqueNumbers.add(randomNumber);
      }

      uniqueNumbers = Array.from(uniqueNumbers);
      tiles.forEach(function(tile, index) {
        setTimeout(function() {
          tile.classList.toggle('party')
          if (tile.classList.contains('party')) {
            //tile.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
            tile.style.backgroundImage = `url(/assets/party/kiran-${uniqueNumbers[index]}.webp)`
          } else {
            //tile.style.backgroundColor = ''
            tile.style.backgroundImage = ''
          }
        }, index * 200)
      })
    }

    //about me
    largestTile.querySelector(".tile-content h1").innerHTML = "About Me"
    const testBlur = document.createElement("img")
    testBlur.classList.add('test-blur')
    testBlur.src = "/assets/test-blur.webp"
    largestTile.querySelector('.tile-content').appendChild(testBlur)
  }

  function group(type) {
    var reducedArray = Object.values(type.reduce((hash, item) => {
      if (!hash[item.index]) {
        hash[item.index] = { key: item.index, size: 0, width: item.width, height: item.height }
      }
      hash[item.index].size += item.size
      
      return hash
    }, {}))
    var results = reducedArray.sort((a,b) => b.size - a.size )
    return results
  }

  //tile open

  const sideMenu = document.querySelector('.side-menu')

  tileItems.forEach(function(tileItem, index) {
    var sideMenuItem = document.createElement("div")
    sideMenuItem.classList.add('side-menu-item')
    sideMenu.appendChild(sideMenuItem)
  })

  const sideMenuItems = document.querySelectorAll('.side-menu-item')

  function expandtiles() {
    const placeholderTiles = document.querySelectorAll('.placeholder-tile')
    const placeholderSideTiles = document.querySelectorAll('.placeholder-side-tile')
    for (let i = 0; i < placeholderTiles.length; i++) {
      placeholderTiles[i].remove()
    }
    setTimeout(function() {
      for (let i = 0; i < placeholderSideTiles.length; i++) {
        placeholderSideTiles[i].remove()
      }
    }, 400)

    tiles.forEach(function(tile, index) {
      var placeholderTile = document.createElement("div")
      placeholderTile.classList.add('placeholder-tile')

      tiles[index].parentNode.insertBefore(placeholderTile, tiles[index])
      tiles[index].classList.add('active','allow-scroll')

      if (tiles[index].classList.contains('focus')) {
      } else {
        tiles[index].style.width = placeholderTile.getBoundingClientRect().width + 'px'
        tiles[index].style.height = placeholderTile.getBoundingClientRect().height + 'px'
        tiles[index].style.top = placeholderTile.getBoundingClientRect().top + 'px'
        tiles[index].style.left = placeholderTile.getBoundingClientRect().left + 'px'
      }

      setTimeout(function() {
        if (tiles[index].classList.contains('focus')) {
          setTimeout(function() {
            tiles[index].classList.remove('focus')
          }, 20);
        }
        tiles[index].style.width = sideMenuItems[index].getBoundingClientRect().width + 'px'
        tiles[index].style.height = sideMenuItems[index].getBoundingClientRect().height + 'px'
        tiles[index].style.top = sideMenuItems[index].getBoundingClientRect().top + 'px'
        tiles[index].style.left = sideMenuItems[index].getBoundingClientRect().left + 'px'
        tiles[index].classList.remove('inactive')
      }, 20)

      tiles[index].onwheel = function(e) {
        scrollTiles(e)
      }
      requestAnimationFrame(() => scrollInstance.onScroll())
    })
  }

  const caseSection = document.querySelector('.case-section')
  var scrollableTiles

  function expandtile(indexToExpand) {
    const placeholderTiles = document.querySelectorAll('.placeholder-tile')
    document.body.classList.add('project-open')

    tiles[indexToExpand].classList.add('active')
    tiles[indexToExpand].classList.remove('allow-scroll')
    tiles[indexToExpand].style.width = placeholderTiles[indexToExpand].getBoundingClientRect().width + 'px'
    tiles[indexToExpand].style.height = placeholderTiles[indexToExpand].getBoundingClientRect().height + 'px'
    tiles[indexToExpand].style.top = placeholderTiles[indexToExpand].getBoundingClientRect().top + 'px'
    tiles[indexToExpand].style.left = placeholderTiles[indexToExpand].getBoundingClientRect().left + 'px'

    setTimeout(function() {
      tiles[indexToExpand].classList.add('focus')
      tiles[indexToExpand].style.top = caseSection.getBoundingClientRect().top + 'px'
      tiles[indexToExpand].style.left = caseSection.getBoundingClientRect().left + 'px'
      tiles[indexToExpand].style.width = caseSection.getBoundingClientRect().width + 'px'
      tiles[indexToExpand].style.height = caseSection.getBoundingClientRect().height + 'px'
      tiles[indexToExpand].style.transform = 'translate3d(0,0,0)'
    }, 20)

    const placeholderSideTile = document.createElement("div")
    placeholderSideTile.classList.add('allow-scroll','placeholder-side-tile')
    placeholderSideTile.style.width = sideMenuItems[indexToExpand].getBoundingClientRect().width + 'px'
    placeholderSideTile.style.height = sideMenuItems[indexToExpand].getBoundingClientRect().height + 'px'
    placeholderSideTile.style.top = sideMenuItems[indexToExpand].getBoundingClientRect().top + 'px'
    placeholderSideTile.style.left = sideMenuItems[indexToExpand].getBoundingClientRect().left + 'px'
    tiles[indexToExpand].parentNode.insertBefore(placeholderSideTile, tiles[indexToExpand])

    tiles[indexToExpand].onwheel = function(e) {
    }
  }      

  //back

  const back = document.querySelector('.back')

  back.onclick = function() {
    requestAnimationFrame(() => scrollInstance.onPause())
    const placeholderTiles = document.querySelectorAll('.placeholder-tile')
    const placeholderSideTiles = document.querySelectorAll('.placeholder-side-tile')
    document.body.classList.remove('project-open')

    tiles.forEach(function(tile, index) {
      // tile.classList.remove('focus')
      tile.querySelector('.tile-cards-wrapper').style.opacity = '0'
      setTimeout(function() {
        tile.scroll(0,0)
        tile.classList.remove('active','allow-scroll','focus')
        placeholderTiles[index].remove()
        tile.style.width = 'auto'
        tile.style.height = 'auto'
        tile.style.top = 'auto'
        tile.style.left = 'auto'
      }, 400)
      setTimeout(function() {
        tile.querySelector('.tile-cards-wrapper').style.opacity = '1'
      }, 800)
      tile.style.width = placeholderTiles[index].getBoundingClientRect().width + 'px'
      tile.style.height = placeholderTiles[index].getBoundingClientRect().height + 'px'
      tile.style.top = placeholderTiles[index].getBoundingClientRect().top + 'px'
      tile.style.left = placeholderTiles[index].getBoundingClientRect().left + 'px'
      tile.classList.add('inactive')
      tile.style.transform = 'translate3d(0,0,0)'
    })
    setTimeout(function() {
      for (let i = 0; i < placeholderSideTiles.length; i++) {
        placeholderSideTiles[i].remove()
      }
    }, 400)
  }

  //scroll tiles

  let scrollValue = 0

  function scrollTiles(e) {
    var scrollableTiles = document.querySelectorAll('.allow-scroll')
    var lastTile = scrollableTiles[scrollableTiles.length - 1]
    var bodyPadding = Number(getComputedStyle(document.body).getPropertyValue('--padding').slice(0, -2))
    if (lastTile) {
      var maxScroll = lastTile.offsetTop - window.innerHeight + lastTile.offsetHeight + bodyPadding
    }
    e.preventDefault()
    scrollValue += e.deltaY
    if ((scrollValue >= 0) && (scrollValue < maxScroll)) {
    } else if (scrollValue < 0) {  
      scrollValue = 0
    } else if (scrollValue >= maxScroll) {
      scrollValue = maxScroll
    }
  }

  sideMenu.onwheel = function(e) {
    scrollTiles(e)
  }

  const config = {
    ease: 0.3,
    current: 0,
    previous: 0,
    rounded: 0
  }
  
  class Scroll {
    constructor(velocity) {
      this.velocity = velocity
    }
  
    onScroll() {
      config.current = scrollValue
      config.previous += (config.current - config.previous) * config.ease
      config.rounded = Math.round(config.previous * 100) / 100

      var scrollableTiles = document.querySelectorAll('.allow-scroll')
      for (let i = 0; i < scrollableTiles.length; i++) {
        scrollableTiles[i].style.transform = `translate3d(0,-${config.rounded}px,0)`
        scrollableTiles[i].style.msTransform = `translate3d(0,-${config.rounded}px,0)`
        scrollableTiles[i].style.webkitTransform = `translate3d(0,-${config.rounded}px,0)`
        scrollableTiles[i].style.MozTransform = `translate3d(0,-${config.rounded}px,0)`
        scrollableTiles[i].style.OTransform = `translate3d(0,-${config.rounded}px,0)`
      }
      requestAnimationFrame(() => this.onScroll())
    }

    onPause() {
      var scrollableTiles = document.querySelectorAll('.allow-scroll')
      for (let i = 0; i < scrollableTiles.length; i++) {
        scrollableTiles[i].style.transform = 'translate3d(0,0,0)'
        scrollableTiles[i].style.msTransform = 'translate3d(0,0,0)'
        scrollableTiles[i].style.webkitTransform = 'translate3d(0,0,0)'
        scrollableTiles[i].style.MozTransform = 'translate3d(0,0,0)'
        scrollableTiles[i].style.OTransform = 'translate3d(0,0,0)'
      }
      requestAnimationFrame(() => this.onPause())
    }
  }
  const scrollInstance = new Scroll(0, true)

  //shuffle 
  
  shuffle.onclick = function() {
    tiles.forEach(function(tile, index) {
      setTimeout(function() {
        tile.style.opacity = '0'
      }, index * 50)
    })
    setTimeout(() => {
      gridWrapper.innerHTML = ''
      setup()
    }, tiles.length * 50 + 200);
  }
}