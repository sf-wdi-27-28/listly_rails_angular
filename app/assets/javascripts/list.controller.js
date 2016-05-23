angular
  .module('ListlyApp')
  .controller('ListController', ListController);

ListController.$inject = ['ListsService', 'ListService', '$location', '$routeParams'];
function ListController(   ListsService,   ListService,   $location,   $routeParams  ) {
  var vm = this;
  console.log('ListController is live');
  var listId = $routeParams.listId;
  vm.list = {};
  vm.items = [];

  vm.deleteItem = deleteItem;


  getList(listId);

  // getting localhost:3000/api/lists/:id NOT localhost:3000/api/lists/:id/items
  // the first includes items and list info (like it's name)
  // the second includes only items
  function getList(id) {
    ListsService.get({id: id}, function(data) {
      console.log('query result:', data);
      vm.list = data;
      vm.items = data.items;
    });
  }

  function deleteItem(item) {
    console.log('deleting item: ', item);
    // list_id was included by the rails representation of this item
    // we can use that, or we have access to the listId from the $routeParams
    ListService.delete({ listId: item.list_id, itemId: item.id }, function(item) {
      console.log('deleted', item);
      vm.items.splice(vm.items.indexOf(item), 1);
    });
  }
}