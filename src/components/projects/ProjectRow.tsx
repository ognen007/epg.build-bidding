import React from 'react';
import { Eye, Edit2, Lock } from 'lucide-react';
import { Project } from '../../types/project';

interface ProjectRowProps {
  project: Project;
  onStatusChange: (status: Project['status']) => void;
}

export function ProjectRow({ project, onStatusChange }: ProjectRowProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{project.title}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {new Date(project.biddingDeadline).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-3">
          <button
            className="text-gray-400 hover:text-gray-500"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="text-gray-400 hover:text-gray-500"
            title="Edit Project"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="text-gray-400 hover:text-gray-500"
            title="Close Bidding"
            onClick={() => onStatusChange('completed')}
          >
            <Lock className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}