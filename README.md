# ScratchTicket
a little plugin for create scratch ticket component

##get to start
1.create a HTML tag as the container of your scratch ticket
```$xslt
<div class="docker"></div>
```

2.import the ScratchTicket.js into your webPage and create a ScratchTicket object
```$xslt
new ScratchTicket({
                mountTarget:'.docker',
                layerText:'first prize',
                handleScratched(e) {
                    window.alert('Congraulation!you got the ' + e.result + '!')
                }
           })
```
the 'mountTarget' attribute is required.And there are many optional attribute allow you to input:
1.canvasWidth:canvas's width
2.canvasHeight:canvas's height
3.coverColor:ticket cover layer's color
4.handleScratched:callback function when the ticket result are shown
5.layerColor:ticket bottom layer's color
6.layerFontSize:font size of ticket result text 
7.layerFontFamily:font family of ticket result text
8.layerText:ticket result's text
9.mountTarget:canvas's container


