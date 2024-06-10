var ctxfolder = "/views/Parents/ParentsSonClasses";


var app = angular.module("App_ESEIM", ["ngRoute", "ngResource", "ui.bootstrap", "datatables"]);

//var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngCookies", "ngValidate", "datatables", "datatables.bootstrap", "pascalprecht.translate", "ngJsTree", "treeGrid", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', 'ui.select', 'ui.tinymce', 'dynamicNumber', 'ngTagsInput']);

app.controller("Ctrl_ESEIM", function ($scope) {

    $scope.hung = "nsjbsjkdf";

});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: ctxfolder + '/index.html',
            controller: "index"
        })
        .when('/detail', {
            templateUrl: ctxfolder + '/detail.html',
            controller: 'detail'
        })
        //.otherwise({
        //    redirectTo: "/"
        //});



});

//app.directive('myDirective', function () {
//    return {
//        restrict: 'A',
//        link: function (scope, element, attrs) {
//            var targetNode = element[0];
//            var config = { childList: true, subtree: true };

//            var callback = function (mutationsList, observer) {
//                for (var mutation of mutationsList) {
//                    if (mutation.type === 'childList') {
//                        console.log('A child node has been added or removed.');
//                    }
//                }
//            };

//            var observer = new MutationObserver(callback);
//            observer.observe(targetNode, config);

//            scope.$on('$destroy', function () {
//                observer.disconnect();
//            });
//        }
//    };
//});





app.controller('index', function ($scope,$compile,$rootScope, $http, $timeout, $uibModal, DTOptionsBuilder, DTColumnBuilder ) {
   


    $scope.detail = function (Id) {
        console.log('Opening detail modal for student with id:', Id);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: ctxfolder + '/detail.html',
            controller: 'detail',
            backdrop: 'static',
            size: '60',
       
            resolve: {
                studentId: function () {
                    return Id;
                }
            }
        });
        modalInstance.opened.then(function () {
            $('.modal').css({
                'display': 'block',
                'visibility': 'visible',
                'opacity': '1'
            });
        });


        modalInstance.result.then(function () {
            $scope.reload();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };


    vm = $scope;
    vm.dtOptions = DTOptionsBuilder.newOptions()
        .withPaginationType('full_numbers')
        .withDisplayLength(9)
        .withOption('autoWidth', false)
        .withOption('processing', true)
        .withOption('lengthChange', false)
        .withOption('searching', false)
        .withOption('scrollX', false)
        .withOption('pageLength', 10)
        .withOption('scrollCollapse', true)
         //tự điều chỉnh độ rộng của cột khớp màn hình
        .withLanguage({
            "info": "_END_ / _TOTAL_ mục",
            "paginate": {
                "first": '<<',
                "last": '>>',
                "next": 'tiếp',
                "previous": 'trước'
            },
            "lengthMenu": "Hiển thị _MENU_ mục",
            "search": "Tìm kiếm:",
            "infoEmpty": "Không có dữ liệu",
            "infoFiltered": "(lọc từ _MAX_ mục)",
            "zeroRecords": "Không tìm thấy dữ liệu"
        })
       

        /*.withOption('scrollX', false)*/
        /*  .withOption('serverSide', true)*/
        .withOption('columnDefs', [
            { targets: 0, visible: false },  // Ẩn cột đầu tiên          
        ])


        .withOption('createdRow', function (row, data, dataIndex) {
            $compile(angular.element(row).contents())($scope);
        });
   
        vm.dtColumns = [
            DTColumnBuilder.newColumn('Id').withTitle('ID').renderWith(function (data, type) {
                return data;
            }),
            DTColumnBuilder.newColumn('Name').withTitle('Tên').renderWith(function (data, type) {
                return data;
            }),
            DTColumnBuilder.newColumn('Year').withTitle('Năm học').renderWith(function (data, type) {
                return data;
            }),
            DTColumnBuilder.newColumn('Grade').withTitle('Lớp').renderWith(function (data, type) {
                return data;
            }),
            DTColumnBuilder.newColumn('Absent').withTitle('Đã nghỉ').renderWith(function (data, type) {
                return data;
            }),
            DTColumnBuilder.newColumn('Address').withTitle('Số tiền còn nợ').renderWith(function (data, type) {
                return data;
            }),
            DTColumnBuilder.newColumn('Lession').notSortable().withTitle('Các buổi học').renderWith(function (data, type, full, meta) {
                return '<button title="Chi tiết" ng-click="detail(' + full.Lession + ')" style="width: 25px;pointer-events: auto !important; height: 25px; padding: 0px;-webkit-box-shadow: 0 2px 5px 0 rgb(0 3 6 / 97%);border-radius: 50%;" class="btn btn-icon-only btn-circle btn-outline-button-icon"><i class="mdi mdi-account-search"></i></button>';


            })
        ];
   
    vm.dtInstance = {};
    vm.dtOptions.data = [
        { Id: 1, Class: '3.1A', Year: '01/01/2000', Absent: 2, Address: 'Address 1' },
        { Id: 2, Class: '25A', Year: '01/02/2000', Absent: 4, Address: 'Address 2' },
        { Id: 3, Class: '40A', Year: '01/03/2000', Absent: 7, Address: 'Address 3' }
    ];
   


    //vm.dtOptions.data = $http.get('http://localhost:3000/api/v1/student/infor?')
    //    .then(function (response) {
    //        $scope.data = response.data;
    //    })
    //    .catch(function (error) {
    //        console.error('Error:', error);
    //    });
    function callback(json) {

    }

 

   


    $scope.reload = function () {
        reloadData(true);
    }
   



});


app.controller('detail', function ($scope, $uibModalInstance, studentId) {

    $scope.studentId = studentId;

    // Example student detail data
    $scope.studentDetail = {
        id: studentId,
        //Name: 'Example Name',
        //Class: '3.1A',
        //DateBirth: '01/01/2000',
        //Absent: 2,
        //Address: 'Example Address',
        //OwedAmount: 100
    };

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});



