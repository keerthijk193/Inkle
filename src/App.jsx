import TaxesTable from './components/TaxesTable'
import './index.css'

function App() {
  return (
    <div>
      <header className="site-header">
        <div>
          <div className="site-title">Inkle — Taxes Dashboard</div>
          <div className="site-subtle">Manage tax entries — edit name and country</div>
        </div>
      </header>

      <main className="card-wrap">
        <TaxesTable />
      </main>
    </div>
  )
}

export default App
