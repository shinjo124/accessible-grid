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
  { name: 'Morgan Lee', role: 'QA Engineer', location: 'Singapore', tasksCompleted: 15 },
  { name: 'Taylor Nguyen', role: 'Frontend Engineer', location: 'Ho Chi Minh City', tasksCompleted: 9 },
  { name: 'Casey Santos', role: 'Product Manager', location: 'Manila', tasksCompleted: 21 },
  { name: 'Riley Wong', role: 'UX Researcher', location: 'Singapore', tasksCompleted: 11 },
  { name: 'Alex Tran', role: 'QA Engineer', location: 'Ho Chi Minh City', tasksCompleted: 6 },
];

type SortDirection = 'ascending' | 'descending';
type ActiveCell = { row: number; col: number };

let sortKey: keyof TeamMember | null = null;
let sortDirection: SortDirection = 'ascending';
let filterQuery = '';
let currentPage = 0;
const pageSize = 5;
let activeCell: ActiveCell = { row: 0, col: 0 };
let selectedMember: TeamMember | null = null;
let visibleData: TeamMember[] = [];

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

const filterLabel = document.createElement('label');
filterLabel.htmlFor = 'team-filter';
appendText(filterLabel, 'Filter team members');
const filterInput = document.createElement('input');
filterInput.id = 'team-filter';
filterInput.type = 'text';
filterInput.addEventListener('input', () => {
  filterQuery = filterInput.value.trim().toLocaleLowerCase();
  renderTable();
});
main.append(filterLabel, filterInput);

const table = document.createElement('table');
const caption = document.createElement('caption');
appendText(caption, 'Team members');
table.appendChild(caption);

const head = document.createElement('thead');
table.appendChild(head);
const body = document.createElement('tbody');
table.appendChild(body);

const pagination = document.createElement('nav');
pagination.setAttribute('aria-label', 'Pagination');
const previousButton = document.createElement('button');
previousButton.type = 'button';
appendText(previousButton, 'Prev');
previousButton.addEventListener('click', () => {
  currentPage -= 1;
  renderTable();
});
const pageStatus = document.createElement('span');
pageStatus.setAttribute('aria-live', 'polite');
pageStatus.setAttribute('aria-current', 'page');
const nextButton = document.createElement('button');
nextButton.type = 'button';
appendText(nextButton, 'Next');
nextButton.addEventListener('click', () => {
  currentPage += 1;
  renderTable();
});
pagination.append(previousButton, pageStatus, nextButton);
const selectionStatus = document.createElement('p');
selectionStatus.setAttribute('aria-live', 'polite');

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
  const shouldRefocus = table.contains(document.activeElement)
    || pagination.contains(document.activeElement);
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLocaleLowerCase().includes(filterQuery),
    ),
  );
  const key = sortKey;
  const sortedData = key
    ? [...filteredData].sort((left, right) => {
        const result = compareValues(left[key], right[key]);
        return sortDirection === 'ascending' ? result : -result;
      })
    : filteredData;
  const pageCount = Math.max(1, Math.ceil(sortedData.length / pageSize));
  currentPage = Math.min(currentPage, pageCount - 1);
  const pageData = sortedData.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  visibleData = pageData;
  activeCell.row = Math.min(activeCell.row, Math.max(0, pageData.length - 1));
  activeCell.col = Math.min(activeCell.col, columns.length - 1);

  const rows = pageData.map((item, rowIndex) => {
    const row = document.createElement('tr');
    if (item === selectedMember) {
      row.classList.add('is-selected');
    }

    columns.forEach((column, columnIndex) => {
      const cell = document.createElement('td');
      cell.tabIndex = rowIndex === activeCell.row && columnIndex === activeCell.col ? 0 : -1;
      appendText(cell, String(item[column.accessorKey]));
      row.appendChild(cell);
    });

    return row;
  });

  if (rows.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = columns.length;
    appendText(cell, 'No team members match your filter.');
    row.appendChild(cell);
    rows.push(row);
  }

  body.replaceChildren(...rows);
  pageStatus.textContent = `Page ${currentPage + 1} of ${pageCount}`;
  previousButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage >= pageCount - 1;
  if (shouldRefocus) {
    focusActiveCell();
  }
}

function focusActiveCell(): void {
  body.rows[activeCell.row]?.cells[activeCell.col]?.focus();
}

body.addEventListener('focusin', (event: FocusEvent) => {
  if (!(event.target instanceof HTMLTableCellElement)) {
    return;
  }

  const cell = event.target;
  const rowIndex = cell.parentElement instanceof HTMLTableRowElement
    ? Array.from(body.rows).indexOf(cell.parentElement)
    : -1;
  if (rowIndex < 0) {
    return;
  }

  activeCell = { row: rowIndex, col: cell.cellIndex };
  body.querySelectorAll<HTMLTableCellElement>('td').forEach((item) => {
    item.tabIndex = item === cell ? 0 : -1;
  });
});

body.addEventListener('keydown', (event: KeyboardEvent) => {
  if (!(event.target instanceof HTMLTableCellElement)) {
    return;
  }

  const cell = event.target;
  const rowIndex = cell.parentElement instanceof HTMLTableRowElement
    ? Array.from(body.rows).indexOf(cell.parentElement)
    : -1;
  if (rowIndex < 0) {
    return;
  }
  activeCell = { row: rowIndex, col: cell.cellIndex };

  if (event.key.startsWith('Arrow')) {
    event.preventDefault();
    const rowDelta = event.key === 'ArrowDown' ? 1 : event.key === 'ArrowUp' ? -1 : 0;
    const columnDelta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    const nextRow = body.rows[activeCell.row + rowDelta];
    const nextCell = nextRow?.cells[activeCell.col + columnDelta];

    if (nextCell) {
      body.querySelectorAll<HTMLTableCellElement>('td[tabindex="0"]').forEach((active) => {
        active.tabIndex = -1;
      });
      nextCell.tabIndex = 0;
      nextCell.focus();
      activeCell = { row: activeCell.row + rowDelta, col: activeCell.col + columnDelta };
    }
    return;
  }

  if (event.key === 'Enter') {
    selectedMember = dataForActiveRow();
    renderRows();
    selectionStatus.textContent = selectedMember ? `Selected ${selectedMember.name}.` : '';
  } else if (event.key === ' ') {
    event.preventDefault();
    const member = dataForActiveRow();
    selectedMember = selectedMember === member ? null : member;
    renderRows();
    selectionStatus.textContent = selectedMember ? `Selected ${selectedMember.name}.` : 'Selection cleared.';
  }
});

function dataForActiveRow(): TeamMember | null {
  return visibleData[activeCell.row] ?? null;
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
main.appendChild(pagination);
main.appendChild(selectionStatus);
app.replaceChildren(main);
