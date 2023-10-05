//grid generator 

var tileItems = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

setup()
function setup() {

    console.log("=================================================================================================================================")

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
    var modalWrapper = document.querySelector("#modal-wrapper")
    var title = document.querySelector(".title")

    tileMouseover()
    function tileMouseover() {
        for (let i = 0; i < gridItems.length; i++) {
            gridItems[i].classList.add('allow-hover')
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

    //tile onclick

    var tiles = document.querySelectorAll('[type="tile"]');
    var tileSize = []
    var randomize = document.querySelector(".randomize")  

    tileClick()
    function tileClick() {
        tiles.forEach(function(tile, index) {
            var size = tile.getBoundingClientRect().width * tile.getBoundingClientRect().height
            tileSize.push({index, size})
            tile.addEventListener("mouseover", function(){
                title.innerHTML = tileItems[index]
            })
            
            tile.addEventListener("mouseout", function(){
                if (!modalWrapper.classList.contains('active')) {
                    title.innerHTML = ''
                }
            })
        })
        var tileSizeOrdered = group(tileSize)

        for (let i = 0; i < tileSizeOrdered.length; i++) {
            // tiles[i].querySelector('.tile-content').innerHTML = tileItems[i]
            tiles[i].classList.add(tileItems[i])
            tiles[i].onclick = function() {
                if (tiles[i].classList.contains('allow-hover')) {
                    expandtile(i)
                }
            }
            var tileClose = document.createElement("div")
            tileClose.classList.add('close-modal')
            tileClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="grey" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="m7 7l10 10M7 17L17 7"/></svg>'
            tiles[i].appendChild(tileClose)
        }

        //party mode
        tiles[tileSizeOrdered[tileSizeOrdered.length - 1].key].querySelector('.tile-content').innerHTML = "(party mode)"
        tiles[tileSizeOrdered[tileSizeOrdered.length - 1].key].addEventListener("mouseover", function(){ title.innerHTML = "???" })
        tiles[tileSizeOrdered[tileSizeOrdered.length - 1].key].onclick = function() {
          tiles.forEach(function(tile, index) {
            tile.classList.toggle('party')
          })
        }

        //about me
        tiles[tileSizeOrdered[0].key].querySelector('.tile-content').innerHTML = "hello my name is kiran"
        tiles[tileSizeOrdered[0].key].addEventListener("mouseover", function(){ title.innerHTML = "about me" })
        
    }

    function group(type) {
        var reducedArray = Object.values(type.reduce((hash, item) => {
            if (!hash[item.index]) {
                hash[item.index] = { key: item.index, size: 0 };
            }
            hash[item.index].size += item.size;
            
            return hash;
        }, {}))
        var results = reducedArray.sort((a,b) => b.size - a.size )
        return results
    }

    function expandtile(indexToExpand) {

        randomize.classList.add('inactive')
        modalWrapper.classList.add('active')
        modalWrapper.style.pointerEvents = 'all'

        var placeholderTile = document.createElement("div")
        placeholderTile.classList.add('placeholder-tile')
        tiles[indexToExpand].parentNode.insertBefore(placeholderTile, tiles[indexToExpand]);

        tiles[indexToExpand].classList.add('active')
        tiles[indexToExpand].style.width = placeholderTile.getBoundingClientRect().width + 'px'
        tiles[indexToExpand].style.height = placeholderTile.getBoundingClientRect().height + 'px'
        tiles[indexToExpand].style.top = placeholderTile.getBoundingClientRect().top + 'px'
        tiles[indexToExpand].style.left = placeholderTile.getBoundingClientRect().left + 'px'
        setTimeout(function() {tiles[indexToExpand].classList.add('modal-open')}, 10);
        for (let i = 0; i < document.querySelectorAll('#grid- div').length; i++) {
            document.querySelectorAll('#grid- div')[i].classList.remove('allow-hover')
        }

        document.getElementsByClassName('close-modal')[indexToExpand].onclick = function() {
            randomize.classList.remove('inactive')
            modalWrapper.classList.remove('active')

            setTimeout(function() {
            modalWrapper.style.pointerEvents = 'none'
            placeholderTile.remove()
            tiles[indexToExpand].classList.remove('active')
            tiles[indexToExpand].style.width = 'auto'
            tiles[indexToExpand].style.height = 'auto'
            tiles[indexToExpand].style.top = 'auto'
            tiles[indexToExpand].style.left = 'auto'
            for (let i = 0; i < document.querySelectorAll('#grid- div').length; i++) {
                document.querySelectorAll('#grid- div')[i].classList.add('allow-hover')
            }
            }, 400);
            tiles[indexToExpand].classList.remove('modal-open')
            tiles[indexToExpand].style.width = placeholderTile.getBoundingClientRect().width + 'px'
            tiles[indexToExpand].style.height = placeholderTile.getBoundingClientRect().height + 'px'
            tiles[indexToExpand].style.top = placeholderTile.getBoundingClientRect().top + 'px'
            tiles[indexToExpand].style.left = placeholderTile.getBoundingClientRect().left + 'px'
        }
    }      

    //randomize 
    
    randomize.onclick = function() {
        gridWrapper.innerHTML = ''
        setup()
    }
}
