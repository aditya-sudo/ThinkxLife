# backend/tests/test_build_index.py

from build_index import load_context_txt


def test_load_context_txt_empty(tmp_path):
    # create an empty file
    p = tmp_path / "empty.txt"
    p.write_text("")
    docs = load_context_txt(str(p), chunk_size=10)
    assert docs == []
