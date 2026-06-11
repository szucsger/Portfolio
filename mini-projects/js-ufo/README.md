# UFO Catcher

Egy rövid, böngészőben futó mini játék, amit kifejezetten gyakorlásra raktam össze. A hangsúly a JavaScript alapú interakción, a DOM-kezelésen és az animációk összekapcsolásán van, nem a komplex játékmeneten.

## Áttekintés

A játék egy retro hangulatú UFO-gyűjtős mini app. A cél az, hogy a játékos a mozgó UFO-t elkapja az alsó catcherrel, miközben a pontszám, a csillagpontok, a hullámok és az idő folyamatosan frissülnek.

## Fő funkciók

- requestAnimationFrame alapú játékciklus
- simított catcher-mozgás billentyűvezérléssel
- UFO mozgás vízszintes és függőleges irányban
- ütközésvizsgálat és találatkezelés
- pontszám animáció és lebegő score popup
- hullámrendszer, streak és nehezedő sebesség
- találatkor időbónusz és HUD frissítés
- külön telepítés nélkül, böngészőből futtatható

## Használt technológiák

- HTML5
- CSS3
- JavaScript

## Projektstruktúra

- [ufo-catcher.html](ufo-catcher.html) - a játék fő oldala
- [ufo-catcher.js](ufo-catcher.js) - a játék logikája
- [style.css](style.css) - a megjelenés és az animációk

## Tanulási cél

Ezzel a projekttel a következőket gyakoroltam:

- DOM-manipuláció
- eseménykezelés
- alap játéklogika és ütközéskezelés
- animációk vezérlése JavaScriptből
- requestAnimationFrame használata
- egyszerű, átlátható kódstruktúra

## Vezérlés

- `A` és `D`
- bal és jobb nyíl

## Játékmenet

- a játékos a catchert mozgatja, hogy elkapja a UFO-t
- minden találat pontot ad, és növeli a streaket
- bizonyos streak után nő a hullámszint és gyorsul a játék
- a találatoknál lebegő pontszám jelenik meg a catcher fölött
- a sikeres catch időbónuszt is ad a mérkőzéshez

## Megnyitás

A projekt közvetlenül megnyitható a `ufo-catcher.html` fájlból.

## Rövid megjegyzés

Ez egy tanulási célú mini projekt, ezért a fókusz a működésen és az érthető kódon volt, nem a komplex játékmechanikán.
