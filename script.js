//grid generator 

var tileItems = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine","ten"]

setup()
function setup() {

  // console.log("=================================================================================================================================")

  generate()

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
    var template = (Math.floor(Math.random() * 4) + 3)
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
  var title = document.querySelector(".title")
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
      gridItems[i].onmouseover = function() {
        gridItems[i].parentElement.classList.add('hover-'+gridItems[i].id)
      }
      gridItems[i].onmouseout = function() {
        gridItems[i].parentElement.classList.remove('hover-'+gridItems[i].id)
      } 
    }
  }

  //tile load in

  var tiles = document.querySelectorAll('[type="tile"]')

  tiles.forEach(function(tile, index) {
    setTimeout(function() {
      tile.style.opacity = '1'
    }, index * 50)
    tile.addEventListener("mouseover", function(){
      setTimeout(function() {
        translateBlur(index)
      }, 200)
    })
    tile.addEventListener("mouseout", function(){
      setTimeout(function() {
        backgroundBlur.style.opacity = '0'
      }, 200)
      // backgroundBlur.style.top = 'auto'
      // backgroundBlur.style.left = 'auto'
      // backgroundBlur.style.width = 'auto'
      // backgroundBlur.style.height = 'auto'
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
  var randomize = document.querySelector(".randomize")  

  tileClick()
  function tileClick() {
    tiles.forEach(function(tile, index) {
      var size = tile.getBoundingClientRect().width * tile.getBoundingClientRect().height
      tileSize.push({index, size})
      tile.addEventListener("mouseover", function(){
        title.style.opacity = '1'
        title.innerHTML = tileItems[index]
      })
      
      tile.addEventListener("mouseout", function(){
        if (!document.body.classList.contains('project-open')) {
          title.style.opacity = '0'
        }
      })
    })
    var tileSizeOrdered = group(tileSize)

    for (let i = 0; i < tileSizeOrdered.length; i++) {
      // tiles[i].querySelector('.tile-content').innerHTML = tileItems[i]
      tiles[i].classList.add(tileItems[i])
      tiles[i].onclick = function() {
        expandtiles()
        expandtile(i)
      }
    }

    const smallestTile = tiles[tileSizeOrdered[tileSizeOrdered.length - 1].key]
    const largestTile = tiles[tileSizeOrdered[0].key]
    tileSizeOrdered.forEach(function(tile, index) {
      //tiles[tile.key].style.zIndex = (tiles.length - index)
      tiles[tile.key].querySelector('.tile-content').innerHTML = tileItems[index]
    })

    //party mode
    smallestTile.querySelector('.tile-content').innerHTML = "what's this?"
    smallestTile.addEventListener("mouseover", function(){ title.innerHTML = "???" })
    smallestTile.onclick = function() {
      toggleParty('on')
      setTimeout(function() {toggleParty('off')}, 2000)
    }
    function toggleParty(toggle) {
      tiles.forEach(function(tile, index) {
        setTimeout(function() {
          tile.classList.toggle('party')
          if (tile.classList.contains('party')) {
            tile.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
          } else {
            tile.style.backgroundColor = ''
          }
        }, index * 200)
      })
    }

    //about me
    largestTile.querySelector('.tile-content').innerHTML = "hello my name is kiran"
    largestTile.addEventListener("mouseover", function(){ title.innerHTML = "about me" })
      
  }

  function group(type) {
    var reducedArray = Object.values(type.reduce((hash, item) => {
      if (!hash[item.index]) {
        hash[item.index] = { key: item.index, size: 0 }
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
    for (let i = 0; i < placeholderTiles.length; i++) {
      placeholderTiles[i].remove()
    }
    tiles.forEach(function(tile, index) {

      var placeholderTile = document.createElement("div")
      placeholderTile.classList.add('placeholder-tile')
      tiles[index].parentNode.insertBefore(placeholderTile, tiles[index])

      tiles[index].classList.remove('focus')
      tiles[index].classList.add('active','allow-scroll')
      tiles[index].style.width = placeholderTile.getBoundingClientRect().width + 'px'
      tiles[index].style.height = placeholderTile.getBoundingClientRect().height + 'px'
      //tiles[index].style.transform = `translate(${placeholderTile.getBoundingClientRect().left}px,${placeholderTile.getBoundingClientRect().top}px)`
      tiles[index].style.top = placeholderTile.getBoundingClientRect().top + 'px'
      tiles[index].style.left = placeholderTile.getBoundingClientRect().left + 'px'

      setTimeout(function() {
        tiles[index].style.transform = `translate(0,${sideMenu.getAttribute("scrollValue")}px)`
        tiles[index].style.width = sideMenuItems[index].getBoundingClientRect().width + 'px'
        tiles[index].style.height = sideMenuItems[index].getBoundingClientRect().height + 'px'
        //tiles[index].style.transform = `translate(${sideMenuItems[index].getBoundingClientRect().left}px,${sideMenuItems[index].getBoundingClientRect().top}px)`
        tiles[index].style.top = sideMenuItems[index].getBoundingClientRect().top + 'px'
        tiles[index].style.left = sideMenuItems[index].getBoundingClientRect().left + 'px'
        tiles[index].classList.remove('inactive')
      }, 10)
    })
  }

  const caseSection = document.querySelector('.case-section')

  function expandtile(indexToExpand) {
    const placeholderTiles = document.querySelectorAll('.placeholder-tile')
    document.body.classList.add('project-open')

    tiles[indexToExpand].classList.add('active','focus')
    tiles[indexToExpand].classList.remove('allow-scroll')
    tiles[indexToExpand].style.width = placeholderTiles[indexToExpand].getBoundingClientRect().width + 'px'
    tiles[indexToExpand].style.height = placeholderTiles[indexToExpand].getBoundingClientRect().height + 'px'
    tiles[indexToExpand].style.top = placeholderTiles[indexToExpand].getBoundingClientRect().top + 'px'
    tiles[indexToExpand].style.left = placeholderTiles[indexToExpand].getBoundingClientRect().left + 'px'

    setTimeout(function() {
      tiles[indexToExpand].style.top = caseSection.getBoundingClientRect().top + 'px'
      tiles[indexToExpand].style.left = caseSection.getBoundingClientRect().left + 'px'
      tiles[indexToExpand].style.width = caseSection.getBoundingClientRect().width + 'px'
      tiles[indexToExpand].style.height = caseSection.getBoundingClientRect().height + 'px'
    }, 10)

    var scrollableTiles = document.querySelectorAll('.allow-scroll')

    scrollableTiles.forEach(function(scrollableTile, index) {
      scrollableTile.onwheel = function(e) {
        scrollTiles(e)
      }
    })
    requestAnimationFrame(() => scrollInstance.onScroll())
  }      

  //back

  const back = document.querySelector('.back')

  back.onclick = function() {
    requestAnimationFrame(() => scrollInstance.onPause())
    const placeholderTiles = document.querySelectorAll('.placeholder-tile')
    document.body.classList.remove('project-open')

    tiles.forEach(function(tile, index) {
      setTimeout(function() {
        tile.classList.remove('active','allow-scroll','focus')
        placeholderTiles[index].remove()
        tile.style.width = 'auto'
        tile.style.height = 'auto'
        tile.style.top = 'auto'
        tile.style.left = 'auto'
      }, 400);
      tile.style.width = placeholderTiles[index].getBoundingClientRect().width + 'px'
      tile.style.height = placeholderTiles[index].getBoundingClientRect().height + 'px'
      tile.style.top = placeholderTiles[index].getBoundingClientRect().top + 'px'
      tile.style.left = placeholderTiles[index].getBoundingClientRect().left + 'px'
      tile.classList.add('inactive')
      // tile.style.transform = 'translate(0,0)'
    })
  }

  //scroll tiles
  let scrollValue = 0

  function scrollTiles(e) {
    var scrollableTiles = document.querySelectorAll('.allow-scroll')
    e.preventDefault()
    scrollValue += e.deltaY
    if (scrollValue >= 0) {
    } else if (scrollValue < 0) {  
      scrollValue = 0
    }
  }

  sideMenu.onwheel = function(e) {
    scrollTiles(e)
  }

  const config = {
    ease: 0.2,
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
        scrollableTiles[i].style.transform = `translate(0,-${config.rounded}px)`
      }
      requestAnimationFrame(() => this.onScroll())
    }

    onPause() {
      var scrollableTiles = document.querySelectorAll('.allow-scroll')
      for (let i = 0; i < scrollableTiles.length; i++) {
        scrollableTiles[i].style.transform = 'translate(0,0)'
      }
      requestAnimationFrame(() => this.onPause())
    }
  }
  const scrollInstance = new Scroll(0, true)

  //randomize 
  
  randomize.onclick = function() {
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

