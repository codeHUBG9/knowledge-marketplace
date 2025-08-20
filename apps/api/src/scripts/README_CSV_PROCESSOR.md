# CSV Difference Processor

A Node.js utility script that removes rows from a larger CSV file that exist in a smaller CSV file, creating a new file with the remaining rows.

## Purpose

This utility is designed to solve the following problem:
- You have two CSV files: one with 88 rows and one with 132 rows
- You want to remove all rows from the 132-row file that exist in the 88-row file
- You want to get a new file containing only the unique rows from the larger file

## Location

The script is located at: `apps/api/src/scripts/csv_diff_processor.js`

## Dependencies

The script uses the following npm packages:
- `csv-parse` - For parsing CSV files
- `csv-stringify` - For writing CSV files

These dependencies are automatically installed when you run `npm install` in the `apps/api` directory.

## Usage

### Command Line

```bash
cd apps/api
node src/scripts/csv_diff_processor.js <smaller_file.csv> <larger_file.csv> <output_file.csv>
```

### Arguments

- `smaller_file.csv` - The CSV file with fewer rows (reference file to compare against)
- `larger_file.csv` - The CSV file with more rows (file to filter)
- `output_file.csv` - The output file that will contain the remaining rows

### Example

```bash
# Example with the test data
node src/scripts/csv_diff_processor.js employees_88_rows.csv employees_132_rows.csv filtered_output.csv
```

## How It Works

1. **Reading**: The script reads both CSV files and parses them into JavaScript objects
2. **Indexing**: Creates a fast lookup index from the smaller file by converting each row to a string representation
3. **Filtering**: Iterates through the larger file, keeping only rows that don't exist in the smaller file
4. **Writing**: Outputs the filtered results to a new CSV file

## Row Comparison

The script compares rows by:
- Converting each row object to a string representation
- Joining all column values with a pipe (`|`) separator
- Sorting column keys to ensure consistent comparison regardless of property order
- This ensures exact matches are found, including all column values

## Features

- ✅ **Flexible CSV format support** - Works with any CSV structure
- ✅ **Fast lookup** - Uses Set data structure for O(1) lookup performance
- ✅ **Comprehensive logging** - Provides detailed progress information
- ✅ **Error handling** - Validates input files and provides clear error messages
- ✅ **Memory efficient** - Streams data processing where possible
- ✅ **Exact matching** - Compares all column values for precise row matching

## Output

The script provides detailed console output showing:
- File paths being processed
- Number of rows in each file
- Number of rows removed (matches found)
- Number of rows remaining in output
- Success/error status

Example output:
```
🚀 Starting CSV difference processing...
📄 Smaller file: employees_88_rows.csv
📄 Larger file: employees_132_rows.csv
📄 Output file: filtered_output.csv

📖 Reading CSV files...
✅ Successfully read 88 rows from employees_88_rows.csv
✅ Successfully read 132 rows from employees_132_rows.csv
📊 Smaller file contains 88 rows
📊 Larger file contains 132 rows

🔍 Creating lookup index from smaller file...
🔄 Filtering larger file...
✂️  Removed 88 matching rows
💾 Remaining 44 rows for output

💾 Writing output file...
✅ Successfully wrote 44 rows to filtered_output.csv

🎉 CSV difference processing completed successfully!
📈 Summary:
   - Original rows in larger file: 132
   - Rows removed (found in smaller file): 88
   - Rows remaining in output: 44
   - Output saved to: filtered_output.csv
```

## Error Handling

The script handles various error conditions:
- Missing input files
- Invalid CSV format
- File permission issues
- Write errors for output file

## Programmatic Usage

The script can also be used as a module in other Node.js applications:

```javascript
const CSVDiffProcessor = require('./src/scripts/csv_diff_processor');

const processor = new CSVDiffProcessor();
await processor.process('smaller.csv', 'larger.csv', 'output.csv');
```

## Limitations

- Both CSV files must have the same column structure (same headers)
- The script loads both files into memory, so very large files (GB+) may require adjustment
- Row comparison is case-sensitive and exact-match only

## Testing

The script has been tested with sample data files containing 88 and 132 rows respectively, successfully removing the matching rows and producing the expected output.