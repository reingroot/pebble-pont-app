var UI = require('ui');

/**
 * Define the menus
 */

// Main menu with all departure stops
var mainMenu = new UI.Menu({
  sections: [{
    title: 'Vertrek vanaf',
    items: [{
      title: 'Centraal Station'
    }, {
      title: 'Buiksloterweg'
    }, {
      title: 'NDSM-werf'
    }, {
      title: 'IJplein'
    }, {
      title: 'Tasmanstraat'
    }, {
      title: 'Distelweg'
    }, {
      title: 'Azartplein'
    }, {
      title: 'Zamenhofstraat'
    }]
  }]
});

// Central Station to ...
var centralMenu = new UI.Menu({
  sections: [{
    title: 'Centraal Station naar',
    items: [{
      title: 'Buiksloterweg'
    }, {
      title: 'NDSM-werf'
    }, {
      title: 'IJplein'
    }]
  }]
});

// NDSM warf to ...
var ndsmMenu = new UI.Menu({
  sections: [{
    title: 'NDSM-werf naar',
    items: [{
      title: 'Centraal Station'
    }, {
      title: 'Tasmanstraat'
    }]
  }]
});

mainMenu.show();

mainMenu.on('select', function (e) {
  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
  
  switch (e.item.title) {
      
    case 'Centraal Station':
      centralMenu.show();
      break;
      
    case 'NDSM-werf':
      ndsmMenu.show();
      break;
  }
});

centralMenu.on('select', function (e) {
  
});