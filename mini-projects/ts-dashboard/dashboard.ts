type TransactionType = "income" | "expense";

interface Transaction {
  id: number;
  type: TransactionType;
  category: string;
  amount: number;
  date: string;
  note?: string;
}

const initialTransactions: Transaction[] = [
  {
    id: 1,
    type: "income",
    category: "Salary",
    amount: 2950,
    date: "2026-01-02",
    note: "Monthly salary",
  },
  {
    id: 2,
    type: "expense",
    category: "Bills",
    amount: 110,
    date: "2026-01-03",
    note: "Phone and Internet",
  },
  {
    id: 3,
    type: "expense",
    category: "Groceries",
    amount: 145,
    date: "2026-01-05",
    note: "Weekly food shopping",
  },
  {
    id: 4,
    type: "expense",
    category: "Utilities",
    amount: 220,
    date: "2026-01-10",
    note: "Heating and electricity",
  },
  {
    id: 5,
    type: "expense",
    category: "Dining",
    amount: 45,
    date: "2026-01-14",
    note: "Menu with colleagues",
  },
  {
    id: 6,
    type: "expense",
    category: "Groceries",
    amount: 130,
    date: "2026-01-19",
    note: "Supermarket run",
  },
  {
    id: 7,
    type: "income",
    category: "Freelance",
    amount: 150,
    date: "2026-01-22",
    note: "Small bug fix job",
  },
  {
    id: 8,
    type: "expense",
    category: "Entertainment",
    amount: 35,
    date: "2026-01-25",
    note: "Streaming & Movies",
  },
  {
    id: 9,
    type: "expense",
    category: "Groceries",
    amount: 160,
    date: "2026-01-29",
    note: "End of month shopping",
  },
  {
    id: 10,
    type: "income",
    category: "Salary",
    amount: 2980,
    date: "2026-02-02",
    note: "Monthly salary",
  },
  {
    id: 11,
    type: "expense",
    category: "Bills",
    amount: 110,
    date: "2026-02-03",
    note: "Phone and Internet",
  },
  {
    id: 12,
    type: "expense",
    category: "Utilities",
    amount: 210,
    date: "2026-02-09",
    note: "Winter utility bill",
  },
  {
    id: 13,
    type: "expense",
    category: "Groceries",
    amount: 150,
    date: "2026-02-11",
    note: "Mid-week groceries",
  },
  {
    id: 14,
    type: "expense",
    category: "Dining",
    amount: 90,
    date: "2026-02-14",
    note: "Valentine's dinner",
  },
  {
    id: 15,
    type: "expense",
    category: "Groceries",
    amount: 125,
    date: "2026-02-20",
    note: "Discounter shopping",
  },
  {
    id: 16,
    type: "income",
    category: "Investment",
    amount: 80,
    date: "2026-02-24",
    note: "Stock dividends",
  },
  {
    id: 17,
    type: "expense",
    category: "Entertainment",
    amount: 40,
    date: "2026-02-27",
    note: "Video game purchase",
  },
  {
    id: 18,
    type: "income",
    category: "Salary",
    amount: 3020,
    date: "2026-03-02",
    note: "Monthly salary (small raise)",
  },
  {
    id: 19,
    type: "expense",
    category: "Bills",
    amount: 115,
    date: "2026-03-03",
    note: "Phone and insurance",
  },
  {
    id: 20,
    type: "expense",
    category: "Groceries",
    amount: 160,
    date: "2026-03-06",
    note: "Weekly restocking",
  },
  {
    id: 21,
    type: "expense",
    category: "Utilities",
    amount: 180,
    date: "2026-03-10",
    note: "Electricity and water",
  },
  {
    id: 22,
    type: "expense",
    category: "Dining",
    amount: 60,
    date: "2026-03-13",
    note: "Friday burger night",
  },
  {
    id: 23,
    type: "expense",
    category: "Groceries",
    amount: 140,
    date: "2026-03-20",
    note: "Lidl trip",
  },
  {
    id: 24,
    type: "income",
    category: "Freelance",
    amount: 250,
    date: "2026-03-24",
    note: "Landing page update",
  },
  {
    id: 25,
    type: "expense",
    category: "Entertainment",
    amount: 55,
    date: "2026-03-27",
    note: "Concert ticket",
  },
  {
    id: 26,
    type: "expense",
    category: "Groceries",
    amount: 110,
    date: "2026-03-31",
    note: "Minor grocery run",
  },
  {
    id: 27,
    type: "income",
    category: "Salary",
    amount: 3050,
    date: "2026-04-02",
    note: "Monthly salary",
  },
  {
    id: 28,
    type: "expense",
    category: "Bills",
    amount: 115,
    date: "2026-04-03",
    note: "Phone and insurance",
  },
  {
    id: 29,
    type: "expense",
    category: "Groceries",
    amount: 195,
    date: "2026-04-05",
    note: "Easter food shopping",
  },
  {
    id: 30,
    type: "expense",
    category: "Utilities",
    amount: 150,
    date: "2026-04-10",
    note: "Spring utilities",
  },
  {
    id: 31,
    type: "expense",
    category: "Dining",
    amount: 75,
    date: "2026-04-14",
    note: "Birthday lunch",
  },
  {
    id: 32,
    type: "expense",
    category: "Groceries",
    amount: 135,
    date: "2026-04-19",
    note: "Regular grocery shopping",
  },
  {
    id: 33,
    type: "expense",
    category: "Entertainment",
    amount: 30,
    date: "2026-04-23",
    note: "Bowling",
  },
  {
    id: 34,
    type: "expense",
    category: "Groceries",
    amount: 120,
    date: "2026-04-28",
    note: "Snacks and drinks",
  },
  {
    id: 35,
    type: "income",
    category: "Salary",
    amount: 3060,
    date: "2026-05-02",
    note: "Monthly salary",
  },
  {
    id: 36,
    type: "expense",
    category: "Bills",
    amount: 115,
    date: "2026-05-03",
    note: "Phone and insurance",
  },
  {
    id: 37,
    type: "expense",
    category: "Travel",
    amount: 850,
    date: "2026-05-04",
    note: "Flight tickets for summer vacation",
  },
  {
    id: 38,
    type: "expense",
    category: "Travel",
    amount: 1400,
    date: "2026-05-05",
    note: "All-inclusive Resort booking",
  },
  {
    id: 39,
    type: "expense",
    category: "Utilities",
    amount: 140,
    date: "2026-05-10",
    note: "Monthly utilities",
  },
  {
    id: 40,
    type: "expense",
    category: "Groceries",
    amount: 110,
    date: "2026-05-12",
    note: "Pre-trip fridge cleaning buy",
  },
  {
    id: 41,
    type: "expense",
    category: "Travel",
    amount: 950,
    date: "2026-05-15",
    note: "Pocket money, car rental & local gifts",
  },
  {
    id: 42,
    type: "expense",
    category: "Travel",
    amount: 450,
    date: "2026-05-22",
    note: "Excursions and scuba diving",
  },
  {
    id: 43,
    type: "income",
    category: "Investment",
    amount: 100,
    date: "2026-05-25",
    note: "Crypto dividends",
  },
  {
    id: 44,
    type: "expense",
    category: "Dining",
    amount: 130,
    date: "2026-05-26",
    note: "Post-vacation fancy dinner",
  },
  {
    id: 45,
    type: "expense",
    category: "Groceries",
    amount: 150,
    date: "2026-05-29",
    note: "Restocking completely empty fridge",
  },
];

const TX_STORAGE_KEY = "ts-dashboard-transactions";
declare const Chart: any;

let expenseChart: any = null;
let incomeExpenseChart: any = null;
let transactions: Transaction[] = loadTransactions();
let currentFilter: TransactionType | "all" = "all";
let currentSort: "date-asc" | "date-desc" | "amount-asc" | "amount-desc" =
  "date-desc";

let balanceValue: HTMLParagraphElement =
  document.querySelector<HTMLParagraphElement>("#balance-value")!;
let incomeValue: HTMLParagraphElement =
  document.querySelector<HTMLParagraphElement>("#income-value")!;
let expenseValue: HTMLParagraphElement =
  document.querySelector<HTMLParagraphElement>("#expense-value")!;
let savingRateValue: HTMLParagraphElement =
  document.querySelector<HTMLParagraphElement>("#saving-rate-value")!;
let transactionsList: HTMLUListElement =
  document.querySelector<HTMLUListElement>("#tx-list")!;
let transactionState: HTMLParagraphElement =
  document.querySelector<HTMLParagraphElement>("#empty-state")!;
let typeInput: HTMLSelectElement =
  document.querySelector<HTMLSelectElement>("#tx-type")!;
let categoryInput: HTMLInputElement =
  document.querySelector<HTMLInputElement>("#tx-category")!;
let amountInput: HTMLInputElement =
  document.querySelector<HTMLInputElement>("#tx-amount")!;
let dateInput: HTMLInputElement =
  document.querySelector<HTMLInputElement>("#tx-date")!;
let noteInput: HTMLInputElement =
  document.querySelector<HTMLInputElement>("#tx-note")!;
let submitForm: HTMLFormElement =
  document.querySelector<HTMLFormElement>("#tx-form")!;
let filterSelect: HTMLSelectElement =
  document.querySelector<HTMLSelectElement>("#tx-filter")!;
let sortSelect: HTMLSelectElement =
  document.querySelector<HTMLSelectElement>("#tx-sort")!;
let expenseChartCanvas: HTMLCanvasElement =
  document.querySelector<HTMLCanvasElement>("#expense-category-canvas")!;
let incomeExpenseChartCanvas: HTMLCanvasElement =
  document.querySelector<HTMLCanvasElement>("#income-expense-canvas")!;

// Function to calculate total income
function totalIncome(): number {
  if (transactions.length === 0) return 0;

  let totalIncome: number = 0;
  for (let i: number = 0; i < transactions.length; i++) {
    if (transactions[i]?.type === "income") {
      totalIncome += transactions[i]?.amount ?? 0;
    }
  }
  return totalIncome;
}

// Function to calculate total expense
function totalExpense(): number {
  if (transactions.length === 0) return 0;

  let totalExpense: number = 0;
  for (let i: number = 0; i < transactions.length; i++) {
    if (transactions[i]?.type === "expense") {
      totalExpense += transactions[i]?.amount ?? 0;
    }
  }
  return totalExpense;
}

// Function to calculate balance
function calculateBalance(): number {
  return totalIncome() - totalExpense();
}

// Function to Calculate Saving Rate
function calculateSavingRate(): number {
  let totalIncomeValue: number = totalIncome();
  let totalExpenseValue: number = totalExpense();

  if (totalIncomeValue === 0) return 0;
  return ((totalIncomeValue - totalExpenseValue) / totalIncomeValue) * 100;
}

// Load transactions from localStorage
function loadTransactions(): Transaction[] {
  const rawData = localStorage.getItem(TX_STORAGE_KEY);
  if (!rawData) return [...initialTransactions];

  const fallbackDate: string = new Date().toISOString().slice(0, 10);

  function normalizeTransaction(
    item: unknown,
    index: number,
  ): Transaction | null {
    if (!item || typeof item !== "object") return null;

    const tx = item as Partial<Transaction>;
    if (tx.type !== "income" && tx.type !== "expense") return null;

    const category: string =
      typeof tx.category === "string" && tx.category.trim().length > 0
        ? tx.category.trim()
        : "Uncategorized";

    const amount: number = Number(tx.amount);
    if (!Number.isFinite(amount) || amount <= 0) return null;

    const date: string =
      typeof tx.date === "string" && tx.date.trim().length >= 7
        ? tx.date
        : fallbackDate;

    const id: number = Number(tx.id);
    const safeId: number = Number.isFinite(id) && id > 0 ? id : index + 1;

    const normalized: Transaction = {
      id: safeId,
      type: tx.type,
      category,
      amount,
      date,
    };

    if (typeof tx.note === "string" && tx.note.trim().length > 0) {
      normalized.note = tx.note.trim();
    }

    return normalized;
  }

  try {
    const parsedData: unknown = JSON.parse(rawData);
    if (!Array.isArray(parsedData)) {
      return [...initialTransactions];
    }

    const normalizedData: Transaction[] = parsedData
      .map((item, index) => normalizeTransaction(item, index))
      .filter((item): item is Transaction => item !== null);

    if (normalizedData.length === 0) {
      return [...initialTransactions];
    }

    return normalizedData;
  } catch (error) {
    return [...initialTransactions];
  }
}

//function to save transactions to localStorage
function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(TX_STORAGE_KEY, JSON.stringify(transactions));
}

// Function to Render Dashboard
function renderSummary(): void {
  balanceValue.textContent = `$${calculateBalance().toFixed(2)}`;
  incomeValue.textContent = `$${totalIncome().toFixed(2)}`;
  expenseValue.textContent = `$${totalExpense().toFixed(2)}`;
  savingRateValue.textContent = `${calculateSavingRate().toFixed(2)}%`;
}

// Function to Render Transactions List
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDisplayDate(rawDate: string): string {
  let parsedDate: Date = new Date(rawDate);
  if (Number.isNaN(parsedDate.getTime())) return rawDate;

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function renderTransactions(): void {
  transactionsList.innerHTML = "";
  let visibleTransactions: Transaction[] = getVisibleTransactions();

  if (visibleTransactions.length === 0) {
    transactionState.style.display = "block";
    transactionsList.style.display = "none";
    return;
  }

  transactionState.style.display = "none";
  transactionsList.style.display = "block";

  for (let i = 0; i < visibleTransactions.length; i++) {
    let tx: Transaction = visibleTransactions[i]!;
    let listItem: HTMLLIElement = document.createElement("li");
    listItem.className =
      "list-group-item d-flex justify-content-between align-items-start gap-3";

    let contentWrap: HTMLDivElement = document.createElement("div");
    contentWrap.className = "w-100";

    let topRow: HTMLDivElement = document.createElement("div");
    topRow.className = "d-flex align-items-center gap-2 flex-wrap";

    let categoryLabel: HTMLSpanElement = document.createElement("span");
    categoryLabel.className = "fw-semibold";
    categoryLabel.textContent = tx.category;

    let typeBadge: HTMLSpanElement = document.createElement("span");
    typeBadge.className =
      tx.type === "income" ? "badge text-bg-success" : "badge text-bg-danger";
    typeBadge.textContent = tx.type === "income" ? "Income" : "Expense";

    let amountLabel: HTMLSpanElement = document.createElement("span");
    amountLabel.className = "ms-auto fw-semibold";
    amountLabel.textContent = formatCurrency(tx.amount);

    topRow.appendChild(categoryLabel);
    topRow.appendChild(typeBadge);
    topRow.appendChild(amountLabel);

    let dateLabel: HTMLParagraphElement = document.createElement("p");
    dateLabel.className = "small text-secondary mb-0 mt-1";
    dateLabel.textContent = formatDisplayDate(tx.date);

    contentWrap.appendChild(topRow);
    contentWrap.appendChild(dateLabel);

    if (tx.note) {
      let noteLabel: HTMLParagraphElement = document.createElement("p");
      noteLabel.className = "small fst-italic text-body-secondary mb-0 mt-1";
      noteLabel.textContent = tx.note;
      contentWrap.appendChild(noteLabel);
    }

    let removeBtn: HTMLButtonElement = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add(
      "btn",
      "btn-sm",
      "btn-outline-danger",
      "remove-btn",
    );
    removeBtn.addEventListener("click", () => removeTransaction(tx.id));
    listItem.appendChild(contentWrap);
    listItem.appendChild(removeBtn);
    transactionsList.appendChild(listItem);
  }
}

// Remove transaction by ID
function removeTransaction(id: number): void {
  let index = transactions.findIndex((tx) => tx.id === id);
  if (index !== -1) {
    transactions.splice(index, 1);
    updateDashboardView();
    saveTransactions(transactions);
  }
}
function getNextId(): number {
  if (transactions.length === 0) return 1;
  return transactions[transactions.length - 1]!.id + 1;
}

// Sent form submission handler
submitForm.addEventListener("submit", (event: Event) => {
  event.preventDefault();
  let inputType: string = typeInput.value;
  let inputCategory: string = categoryInput.value.trim();
  let inputAmount: number = parseFloat(amountInput.value);
  let inputDate: string = dateInput.value;
  let inputNote: string = noteInput.value.trim();

  if (
    !inputType ||
    !inputCategory ||
    isNaN(inputAmount) ||
    inputAmount <= 0 ||
    !inputDate
  ) {
    alert("Please fill in all required fields.");
    return;
  }
  let newTransaction: Transaction = {
    id: getNextId(),
    type: inputType as TransactionType,
    category: inputCategory,
    amount: inputAmount,
    date: inputDate,
  };

  if (inputNote) {
    newTransaction.note = inputNote;
  }
  transactions.push(newTransaction);
  updateDashboardView();
  saveTransactions(transactions);
  submitForm.reset();
});

// Expense Category Chart Event Helper
function expenseCategoryChart(): { labels: string[]; data: number[] } {
  const totalsByCategory: Record<string, number> = {};

  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];
    if (!tx || tx.type !== "expense") continue;

    const category = tx.category || "Uncategorized";
    const amount = tx.amount || 0;

    if (!totalsByCategory[category]) {
      totalsByCategory[category] = 0;
    }
    totalsByCategory[category] += amount;
  }

  const labels = Object.keys(totalsByCategory);
  const data = labels.map((label) => totalsByCategory[label] ?? 0);

  return { labels, data };
}

// income vs Expense Chart Event Helper
function incomeVsExpenseChart(): {
  labels: string[];
  balanceData: number[];
} {
  let monthlyNetByMonth: Record<string, number> = {};

  for (let i: number = 0; i < transactions.length; i++) {
    let tx: Transaction | undefined = transactions[i];
    if (!tx || !tx.date) continue;

    let monthKey: string = tx.date.slice(0, 7);
    if (monthKey.length !== 7) continue;
    let amount: number = Number(tx.amount) || 0;

    if (!monthlyNetByMonth[monthKey]) {
      monthlyNetByMonth[monthKey] = 0;
    }

    if (tx.type === "income") {
      monthlyNetByMonth[monthKey] += amount;
    } else {
      monthlyNetByMonth[monthKey] -= amount;
    }
  }

  let labels: string[] = Object.keys(monthlyNetByMonth).sort((a, b) =>
    a.localeCompare(b),
  );

  let runningBalance: number = 0;
  let balanceData: number[] = labels.map((label) => {
    runningBalance += monthlyNetByMonth[label] ?? 0;
    return runningBalance;
  });

  return { labels, balanceData };
}

// Render Expense Category Chart
function renderExpenseCategoryChart(): void {
  if (expenseChart) {
    expenseChart.destroy();
  }
  let { labels, data } = expenseCategoryChart();
  if (labels.length === 0) {
    labels = ["No Data"];
    data = [0];
  }
  expenseChart = new Chart(expenseChartCanvas, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// Render Income vs Expense Chart
function renderIncomeExpenseChart(): void {
  if (incomeExpenseChart) {
    incomeExpenseChart.destroy();
  }
  let { labels, balanceData } = incomeVsExpenseChart();
  if (labels.length === 0) {
    labels = ["No Data"];
    balanceData = [0];
  }
  incomeExpenseChart = new Chart(incomeExpenseChartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Balance",
          data: balanceData,
          borderColor: "#36A2EB",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          pointRadius: 5,
          pointHoverRadius: 6,
          borderWidth: 3,
          tension: 0.25,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
}

// Update charts when transactions change
function updateDashboardView(): void {
  renderSummary();
  renderTransactions();
  renderExpenseCategoryChart();
  renderIncomeExpenseChart();
}

// Filter Event Handler
filterSelect.addEventListener("change", () => {
  currentFilter = filterSelect.value as TransactionType | "all";
  updateDashboardView();
});

// Sort Event Handler
sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value as typeof currentSort;
  updateDashboardView();
});

// Function to get visible transactions based on current filter and sort
function getVisibleTransactions(): Transaction[] {
  let visibleTransactions: Transaction[] = [...transactions];
  if (currentFilter !== "all") {
    visibleTransactions = visibleTransactions.filter(
      (tx) => tx.type === currentFilter,
    );
  }
  if (currentSort === "date-asc") {
    visibleTransactions.sort((a, b) => a.date.localeCompare(b.date));
  } else if (currentSort === "date-desc") {
    visibleTransactions.sort((a, b) => b.date.localeCompare(a.date));
  } else if (currentSort === "amount-asc") {
    visibleTransactions.sort((a, b) => a.amount - b.amount);
  } else if (currentSort === "amount-desc") {
    visibleTransactions.sort((a, b) => b.amount - a.amount);
  }
  return visibleTransactions;
}

updateDashboardView();
