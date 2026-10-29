import type { ColumnDef } from '../data-grid-contract';
import './style.css';

interface TeamMember {
  name: string;
  role: string;
  location: string;
}

const columns: ColumnDef<TeamMember>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Role', accessorKey: 'role' },
  { header: 'Location', accessorKey: 'location' },
];

const data: TeamMember[] = [
  { name: 'Avery Chen', role: 'Product Designer', location: 'Singapore' },
  { name: 'Jordan Patel', role: 'Frontend Engineer', location: 'Ho Chi Minh City' },
  { name: 'Sam Rivera', role: 'Accessibility Specialist', location: 'Manila' },
];

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
const headerRow = document.createElement('tr');

for (const column of columns) {
  const th = document.createElement('th');
  th.scope = 'col';
  appendText(th, column.header);
  headerRow.appendChild(th);
}

head.appendChild(headerRow);
table.appendChild(head);

const body = document.createElement('tbody');

for (const item of data) {
  const row = document.createElement('tr');

  for (const column of columns) {
    const cell = document.createElement('td');
    appendText(cell, String(item[column.accessorKey]));
    row.appendChild(cell);
  }

  body.appendChild(row);
}

table.appendChild(body);
main.appendChild(table);
app.replaceChildren(main);
