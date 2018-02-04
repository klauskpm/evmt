# Event Emitter DOM
Super simple event emitter

Communicate between layers of code without the worry to build a complex solution, thinking of depth, or event injection.

## Quick start

### Install
Using npm:  
`npm install --save event-emitter-dom`

Using yarn:  
`yarn add event-emitter-dom`

### Usage
Basic concept
````javascript
import EventEmitterDOM from 'event-emitter-dom'

// Creating the event
const onAnimalGoes = new EventEmitterDOM()
const animalGoes = (animal, sound) => {
  console.log(`${animal} goes ${sound}`)
  
  // Emits the params when the event occur
  onAnimalGoes.emit(animal, sound)
}

// Subscribes to the event
const subscription1 = onAnimalGoes.subscribe((animal) => {
  console.log(`The ${animal} should be quiet!`)
})
const subscription2 = onAnimalGoes.subscribe((animal, sound) => {
  console.log(`I like when the ${animal} goes ${sound}`)
})

animalGoes('Sheep', 'beep')
// Removes the subscription when done with it
subscription2.remove()
animalGoes('Cow', 'meow')
subscription1.remove()
animalGoes('Cat', 'Bazinga')
````

Advanced usage, with components
```javascript
import EventEmitterDOM from 'event-emitter-dom'

const AnimalListComponent = {
  select(animal) {
    AnimalService.select(animal)
  }
}

const AnimalService = {
  onSelect: new EventEmitterDOM(),
  select(animal) {
    console.log(`Selected ${animal}`)
    this.onSelect.emit(animal)
  }
}

const FarmComponent = {
  init() {
    this.farmAnimals = []
    this.handleSelectedAnimal = this.handleSelectedAnimal.bind(this)
    this.subscriptions = [
      AnimalService.onSelect.subscribe(this.handleSelectedAnimal)
    ]
  },
  destroy() {
    this.subscriptions.forEach(sub => sub.remove())
  },
  handleSelectedAnimal(animal) {
    this.farmAnimals.push(animal)
    console.log(animal, this.farmAnimals)
  }
}

FarmComponent.init()
AnimalListComponent.select('cow')
AnimalListComponent.select('cat')
AnimalListComponent.select('dog')
FarmComponent.destroy()
AnimalListComponent.select('pig')
AnimalListComponent.select('bat')
```

----

## Documentation

### EventEmitterDOM
It returns it's own instance which is used to subscribe to and emit events.

#### `emit([arg1, ..., argN])`
Calls/emits each subscribed callback passing the parameters it received.

|Param|Type|Description|
|-|-|-|
|`arg1`...`argN`|any|A list of values to be emitted|

##### Example
```javascript
const onSelect = new EventEmitterDOM()

onSelect.emit(1, '2', { exp: 3 }, [4])
```

#### `subscribe(callback)`
Subscribes an callback into an event to wait for the emit. It returns an "subscription" that can removes itself from the subscriptions.

|Param|Type|Description|
|-|-|-|
|`callback`|Function|A function to handle the emitted event|

##### Example
```javascript
const onSelect = new EventEmitterDOM()

const subscription = onSelect.subscribe((param1, param2, param3, param4) => {
  console.log(param1, param2, param3, param4)
})

subscription.remove()
```

#### `remove(index)`
Removes the subscribed function from the subscriptions by it's index

|Param|Type|Description|
|-|-|-|
|`index`|Number|The subscription index to be removed|

##### Example
```javascript
const onSelect = new EventEmitterDOM()

const subscription = onSelect.subscribe((param1, param2, param3, param4) => {
  console.log(param1, param2, param3, param4)
})

// It's the same as subscription.remove()
onSelect.remove(0)
```