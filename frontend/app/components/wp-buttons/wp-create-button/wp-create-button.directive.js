// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

angular
  .module('openproject.workPackages')
  .directive('wpCreateButton', wpCreateButton);

function wpCreateButton() {
  return {
    restrict: 'E',
    templateUrl: '/components/wp-buttons/wp-create-button/wp-create-button.directive.html',

    scope: {
      projectIdentifier: '=',
      stateName: '@'
    },

    bindToController: true,
    controllerAs: 'vm',
    controller: WorkPackageCreateButtonController
  }
}

function WorkPackageCreateButtonController($state, ProjectService) {
  var vm = this,
      inProjectContext = !!vm.projectIdentifier,
      canCreate= false;

  vm.text = {
    button: I18n.t('js.label_work_package'),
    create: I18n.t('js.label_create_work_package')
  };

  vm.isDisabled = function () {
    return !inProjectContext || !canCreate || $state.includes('**.new') || !vm.types;
  };

  if (inProjectContext) {
    ProjectService.fetchProjectResource(vm.projectIdentifier).then(function(project) {
      canCreate = !!project.links.createWorkPackage;
    });

    ProjectService.getProject(vm.projectIdentifier).then(function (project) {
      vm.types = project.embedded.types;
    });
  }
}
