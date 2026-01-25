// FlexboxMindsetShift.tsx
import React, { useState } from 'react';
import './FlexboxMindsetShift.css';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';

interface FlexboxMindsetShiftProps {
  title?: string;
  initialItemCount?: number;
}

const FlexboxMindsetShift: React.FC<FlexboxMindsetShiftProps> = ({
  title = 'Flexbox Mindset Shift',
  initialItemCount = 5,
}) => {
  // State for flexbox properties
  const [flexDirection, setFlexDirection] = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent] = useState<JustifyContent>('flex-start');
  const [alignItems, setAlignItems] = useState<AlignItems>('stretch');
  const [flexWrap, setFlexWrap] = useState<boolean>(false);
  const [gap, setGap] = useState<number>(10);
  const [itemCount, setItemCount] = useState<number>(initialItemCount);

  // CSS object for the container
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    flexWrap: flexWrap ? 'wrap' : 'nowrap',
    gap: `${gap}px`,
    padding: '20px',
    backgroundColor: '#f5f5f5',
    border: '2px solid #ddd',
    borderRadius: '8px',
    minHeight: '200px',
    marginBottom: '20px',
  };

  // Generate flex items
  const flexItems = Array.from({ length: itemCount }, (_, i) => i + 1);

  // Property options
  const flexDirectionOptions: FlexDirection[] = ['row', 'row-reverse', 'column', 'column-reverse'];
  const justifyContentOptions: JustifyContent[] = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'];
  const alignItemsOptions: AlignItems[] = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'];

  return (
    <div className="flexbox-mindset-component">
      <header className="component-header">
        <h2>{title}</h2>
        <p className="subtitle">Don't memorize properties — solve alignment, distribution, and sizing problems</p>
      </header>

      <div className="component-body">
        {/* Controls Panel */}
        <div className="controls-panel">
          <div className="controls-section">
            <h3>🔧 Flexbox Controls</h3>
            
            <div className="control-group">
              <label>
                <strong>1. Direction:</strong>
                <select 
                  value={flexDirection} 
                  onChange={(e) => setFlexDirection(e.target.value as FlexDirection)}
                >
                  {flexDirectionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="control-group">
              <label>
                <strong>2. Justify Content (Main Axis):</strong>
                <select 
                  value={justifyContent} 
                  onChange={(e) => setJustifyContent(e.target.value as JustifyContent)}
                >
                  {justifyContentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="control-group">
              <label>
                <strong>3. Align Items (Cross Axis):</strong>
                <select 
                  value={alignItems} 
                  onChange={(e) => setAlignItems(e.target.value as AlignItems)}
                >
                  {alignItemsOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="control-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={flexWrap}
                  onChange={(e) => setFlexWrap(e.target.checked)}
                />
                <strong>Flex Wrap:</strong> {flexWrap ? 'Wrap' : 'No Wrap'}
              </label>
            </div>

            <div className="control-group">
              <label>
                <strong>Gap:</strong>
                <input 
                  type="range" 
                  min="0" 
                  max="40" 
                  value={gap}
                  onChange={(e) => setGap(parseInt(e.target.value))}
                />
                <span>{gap}px</span>
              </label>
            </div>

            <div className="control-group">
              <label>
                <strong>Items:</strong>
                <input 
                  type="number" 
                  min="1" 
                  max="12" 
                  value={itemCount}
                  onChange={(e) => setItemCount(parseInt(e.target.value) || 1)}
                />
              </label>
              <button 
                className="reset-btn"
                onClick={() => {
                  setFlexDirection('row');
                  setJustifyContent('flex-start');
                  setAlignItems('stretch');
                  setFlexWrap(false);
                  setGap(10);
                }}
              >
                Reset to Default
              </button>
            </div>
          </div>

          <div className="mindset-tips">
            <h3>💡 Mindset Tips</h3>
            <ul>
              <li><strong>Direction:</strong> Row vs Column — what's your main flow?</li>
              <li><strong>Justify:</strong> How to distribute items along main axis?</li>
              <li><strong>Align:</strong> How to align items along cross axis?</li>
              <li><strong>Wrap:</strong> What happens when there's no space?</li>
              <li><strong>Gap:</strong> Use instead of margins between items</li>
            </ul>
          </div>
        </div>

        {/* Visual Demo */}
        <div className="visual-demo">
          <h3>👁️ Live Preview</h3>
          <div className="demo-container" style={containerStyle}>
            {flexItems.map((item) => (
              <div key={item} className="flex-item">
                {item}
                <div className="item-label">
                  Item {item}
                  <div className="item-size">100×60</div>
                </div>
              </div>
            ))}
          </div>

          {/* Generated CSS Code */}
          <div className="css-output">
            <h4>Generated CSS:</h4>
            <pre>
{`.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap ? 'wrap' : 'nowrap'};
  gap: ${gap}px;
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="common-patterns">
        <h3>🎯 Common Patterns</h3>
        <div className="patterns-grid">
          <button 
            className="pattern-btn"
            onClick={() => {
              setJustifyContent('space-between');
              setAlignItems('center');
            }}
          >
            Navbar
          </button>
          <button 
            className="pattern-btn"
            onClick={() => {
              setJustifyContent('center');
              setAlignItems('center');
            }}
          >
            Centered
          </button>
          <button 
            className="pattern-btn"
            onClick={() => {
              setFlexDirection('column');
              setGap(15);
            }}
          >
            Sidebar
          </button>
          <button 
            className="pattern-btn"
            onClick={() => {
              setJustifyContent('center');
              setFlexWrap(true);
              setGap(20);
            }}
          >
            Card Grid
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlexboxMindsetShift;