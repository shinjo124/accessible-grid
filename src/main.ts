import type { ColumnDef } from '../data-grid-contract';
import './style.css';

interface TeamMember {
  name: string;
  role: string;
  location: string;
  tasksCompleted: number;
}

const columns: ColumnDef<TeamMember>[] = [
  { header: 'Name', accessorKey: 'name', sortable: true },
  { header: 'Role', accessorKey: 'role', sortable: true },
  { header: 'Location', accessorKey: 'location', sortable: true },
  { header: 'Tasks completed', accessorKey: 'tasksCompleted', sortable: true },
];

const data: TeamMember[] = [
  { name: 'Avery Chen', role: 'Product Designer', location: 'Singapore', tasksCompleted: 18 },
  { name: 'Jordan Patel', role: 'Frontend Engineer', location: 'Ho Chi Minh City', tasksCompleted: 7 },
  { name: 'Sam Rivera', role: 'Accessibility Specialist', location: 'Manila', tasksCompleted: 12 },
];

type SortDirection = 'ascending' | 'descending';

let sortKey: keyof TeamMember | null = null;
let sortDirection: SortDirection = 'ascending';

function appendText(parent: Node, value: string): void {
  parent.appendChild(document.createTextNode(value));
}

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root element was not found.');
}

const main = document.createElement('main');
const heading = document.createElement('h1');
appendText(heading, 'Team directory');
main.appendChild(heading);

const table = document.createElement('table');
const caption = document.createElement('caption');
appendText(caption, 'Team members');
table.appendChild(caption);

const head = document.createElement('thead');
table.appendChild(head);
const body = document.createElement('tbody');
table.appendChild(body);

function compareValues(left: string | number, right: string | number): number {
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }

  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

function renderRows(): void {
  const key = sortKey;
  const sortedData = key
    ? [...data].sort((left, right) => {
        const result = compareValues(left[key], right[key]);
        return sortDirection === 'ascending' ? result : -result;
      })
    : data;

  const rows = sortedData.map((item) => {
    const row = document.createElement('tr');

    for (const column of columns) {
      const cell = document.createElement('td');
      appendText(cell, String(item[column.accessorKey]));
      row.appendChild(cell);
    }

    return row;
  });

  body.replaceChildren(...rows);
}

function renderHeaders(): void {
  const headerRow = document.createElement('tr');

  for (const column of columns) {
    const th = document.createElement('th');
    th.scope = 'col';

    if (column.sortable) {
      const button = document.createElement('button');
      button.type = 'button';
      appendText(button, column.header);
      button.addEventListener('click', () => {
        if (sortKey === column.accessorKey) {
          sortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
        } else {
          sortKey = column.accessorKey;
          sortDirection = 'ascending';
        }

        renderTable();
      });
      th.appendChild(button);
    } else {
      appendText(th, column.header);
    }

    headerRow.appendChild(th);
  }

  head.replaceChildren(headerRow);
}

function renderTable(): void {
  columns.forEach((column, index) => {
    const th = head.rows[0]?.cells[index];

    if (th && sortKey === column.accessorKey) {
      th.setAttribute('aria-sort', sortDirection);
    } else {
      th?.removeAttribute('aria-sort');
    }
  });
  renderRows();
}

renderHeaders();
renderTable();
main.appendChild(table);
app.replaceChildren(main);
